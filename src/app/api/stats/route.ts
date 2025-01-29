import { NextResponse } from 'next/server';
import { getMembersCollection } from '@/lib/db';

export async function GET() {
  try {
    const membersCollection = await getMembersCollection();

    const pipeline = [
      {
        $facet: {
          totalStats: [
            {
              $group: {
                _id: null,
                totalMembers: { $sum: 1 },
                devs: { $sum: { $cond: ['$dev', 1, 0] } },
                designers: { $sum: { $cond: ['$des', 1, 0] } },
                pms: { $sum: { $cond: ['$pm', 1, 0] } },
                core: { $sum: { $cond: ['$core', 1, 0] } },
                mentors: { $sum: { $cond: ['$mentor', 1, 0] } },
                
                // Additional stats for majors and minors
                uniqueMajors: { $addToSet: '$major' },
                uniqueMinors: { $addToSet: '$minor' },
                
                // Members with complete profiles
                completedProfiles: {
                  $sum: {
                    $cond: [
                      {
                        $and: [
                          { $ne: ['$picture', null] },
                          { $ne: ['$quote', ''] },
                          { $ne: ['$home', ''] },
                          { $ne: ['$birthday', ''] }
                        ]
                      },
                      1,
                      0
                    ]
                  }
                }
              }
            },
            {
              $project: {
                _id: 0,
                totalMembers: 1,
                devs: 1,
                designers: 1,
                pms: 1,
                core: 1,
                mentors: 1,
                majorCount: { $size: '$uniqueMajors' },
                minorCount: { $size: '$uniqueMinors' },
                completedProfiles: 1
              }
            }
          ],
          membersByYear: [
            {
              $group: {
                _id: '$year',
                count: { $sum: 1 },
                // Role breakdown per year
                devCount: { $sum: { $cond: ['$dev', 1, 0] } },
                designerCount: { $sum: { $cond: ['$des', 1, 0] } },
                pmCount: { $sum: { $cond: ['$pm', 1, 0] } },
                coreCount: { $sum: { $cond: ['$core', 1, 0] } },
                mentorCount: { $sum: { $cond: ['$mentor', 1, 0] } }
              }
            },
            {
              $sort: { _id: 1 }
            }
          ],
          majorDistribution: [
            {
              $group: {
                _id: '$major',
                count: { $sum: 1 }
              }
            },
            {
              $sort: { count: -1 }
            }
          ],
          roleOverlap: [
            {
              $group: {
                _id: null,
                devAndDesign: {
                  $sum: {
                    $cond: [{ $and: ['$dev', '$des'] }, 1, 0]
                  }
                },
                devAndPM: {
                  $sum: {
                    $cond: [{ $and: ['$dev', '$pm'] }, 1, 0]
                  }
                },
                designAndPM: {
                  $sum: {
                    $cond: [{ $and: ['$des', '$pm'] }, 1, 0]
                  }
                }
              }
            }
          ]
        }
      }
    ];

    const result = await membersCollection.aggregate(pipeline).toArray();

    return NextResponse.json({
      totalStats: result[0].totalStats[0],
      membersByYear: result[0].membersByYear,
      majorDistribution: result[0].majorDistribution,
      roleOverlap: result[0].roleOverlap[0]
    });
  } catch (error) {
    console.error('Failed to fetch stats:', error);
    return new NextResponse('Error fetching stats', { status: 500 });
  }
}
