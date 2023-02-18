import { MongoClient } from "mongodb";
export const connectDatabase = async () => {
  return await MongoClient.connect(
    "mongodb+srv://abdalfadeelh:5YrqUHFdiLeTTtkI@cluster0.4czxmst.mongodb.net/events?retryWrites=true&w=majority"
  );
};

export const insertDocument = async (client, collection, document) => {
  const db = client.db();
  const result = await db.collection(collection).insertOne(document);
  return result;
};

export const getAllDocuments = async (client, collection, sort) => {
  const db = client.db();
  const documents = await db.collection(collection).find().sort(sort).toArray();
  return documents;
};
