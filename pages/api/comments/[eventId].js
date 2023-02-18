import {
  connectDatabase,
  getAllDocuments,
  insertDocument,
} from "@/helpers/db-util";

const handler = async (req, res) => {
  const { eventId } = req.query;

  let client;
  try {
    client = await connectDatabase();
  } catch (err) {
    res.status(500).json({ message: "Connecting to database failed!" });
    return;
  }

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

    try {
      const result = await insertDocument(client, "comments", newComment);
      newComment._id = result.insertedId;
    } catch (err) {
      res.status(500).json({ message: "Inserting data failed!" });
      client.close();
      return;
    }

    res.status(201).json({
      message: "Added comment!",
      comment: newComment,
    });
  }

  if (req.method === "GET") {
    try {
      const documents = await getAllDocuments(client, "comments", { _id: -1 });
      res.status(200).json({
        comments: documents,
      });
    } catch (err) {
      res.status(500).json({ message: "Getting comments failed!" });
    }
  }
  client.close();
};
export default handler;
