import { getMembersCollection } from './src/lib/db';


const loadUsers = async () => {
  try {
    // Load the JSON file
    const users = require('../../public/members.json'); // Adjust the path to your JSON file

    // Get the members collection
    const membersCollection = await getMembersCollection();

    // Insert the users into the database
    const result = await membersCollection.insertMany(users);

    console.log(`${result.insertedCount} users were successfully inserted!`);
  } catch (error) {
    console.error('Error inserting users:', error);
  } finally {
    process.exit(0); // Ensure the script exits
  }
};

loadUsers();
