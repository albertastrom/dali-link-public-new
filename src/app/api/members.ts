import type { NextApiRequest, NextApiResponse } from "next";
import { getMembersCollection } from "../../lib/db";
import { Member } from "../../lib/db"; 

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Member[] | { error: string }>
) {
  try {
    const membersCollection = await getMembersCollection();
    const members = await membersCollection.find({}).toArray();

    res.status(200).json(members);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch members" });
  }
}
