const handler = (req, res) => {
  const { eventId } = req.query;
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
      id: eventId,
      email,
      name,
      text,
    };
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
        id: commentId,
      },
    ];

    res.status(200).json({
      comments: dummyComments,
    });
  }
};
export default handler;
