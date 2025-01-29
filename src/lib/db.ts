import { MongoClient, Db, Collection } from "mongodb";

export interface Member {
  name: string;
  year: string;
  dev: boolean;
  des: boolean;
  pm: boolean;
  core: boolean;
  mentor: boolean;
  major: string;
  minor?: string | null;
  birthday: string;
  home: string;
  quote: string;
  favoriteThings: string[];
  favoriteDartmouthTradition?: string | null;
  funFact?: string | null;
  picture: string;
  interest1?: string | null;
  interest2?: string | null;
}

const uri = process.env.MONGO_URI || ""; 
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!process.env.MONGO_URI) {
  throw new Error("Please add your Mongo URI to .env");
}

client = new MongoClient(uri, options);
clientPromise = client.connect();

export const getDb = async (): Promise<Db> => {
  const mongoClient = await clientPromise;
  return mongoClient.db("membersDB");
};


export const getMembersCollection = async (): Promise<Collection<Member>> => {
  const db = await getDb();
  return db.collection<Member>("members");
};

export default clientPromise;
