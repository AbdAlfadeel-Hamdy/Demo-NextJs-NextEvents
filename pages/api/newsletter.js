import { MongoClient } from "mongodb";

const connectDatabase = async () => {
  return await MongoClient.connect(
    "mongodb+srv://abdalfadeelh:5YrqUHFdiLeTTtkI@cluster0.4czxmst.mongodb.net/events?retryWrites=true&w=majority"
  );
};

const insertDocument = async (client, document) => {
  const db = client.db();
  await db.collection("newsletter").insertOne({
    document,
  });
};
const handler = async (req, res) => {
  if (req.method === "POST") {
    const userEmail = req.body.email;
    if (!userEmail || !userEmail.includes("@")) {
      res.status(422).json({ message: "Invalid email address." });
      return;
    }
    let client;
    try {
      client = await connectDatabase();
    } catch (err) {
      res.status(500).json({ message: "Connecting to database failed!" });
      return;
    }
    try {
      await insertDocument(client, { email: userEmail });
      client.close();
    } catch (err) {
      res.status(500).json({ message: "Inserting data failed!" });
      return;
    }

    res.status(201).json({ message: "Signed up!" });
  }
};

export default handler;
