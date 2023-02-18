import { MongoClient } from "mongodb";

const handler = async (req, res) => {
  const { eventId } = req.query;

  const client = await MongoClient.connect(
    "mongodb+srv://abdalfadeelh:5YrqUHFdiLeTTtkI@cluster0.4czxmst.mongodb.net/events?retryWrites=true&w=majority"
  );
  const db = client.db();
  if (req.method === "POST") {
    const { email, name, text } = req.body;
    if (
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !text ||
      text.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid input!" });
    }
    const newComment = {
      eventId,
      email,
      name,
      text,
    };
    const result = await db.collection("comments").insertOne(newComment);
    newComment.id = result.insertedId;
    res.status(201).json({
      message: "Added comment!",
      comment: newComment,
    });
  }
  if (req.method === "GET") {
    const dummyComments = [
      {
        text: "good",
        name: "Adam",
        id: eventId,
      },
    ];

    res.status(200).json({
      comments: dummyComments,
    });
  }
  client.close();
};
export default handler;
