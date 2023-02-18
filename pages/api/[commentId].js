const handler = (req, res) => {
  const { commentId } = req.query;
  console.log(commentId);
  if (req.method === "POST") {
    res.status(201).json({
      id: commentId,
      ...req.body,
    });
  } else {
    res.status(201).json({
      comments: [
        {
          title: "good",
          user: "Adam",
          id: commentId,
        },
      ],
    });
  }
};
export default handler;
