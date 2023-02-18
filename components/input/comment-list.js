import { useEffect, useState } from "react";
import classes from "./comment-list.module.css";

function CommentList(props) {
  const [comments, setComments] = useState([]);
  useEffect(() => {
    fetch(`/api/${props.commentId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data) setComments(data.comments);
      });
  }, []);
  return (
    <ul className={classes.comments}>
      {/* Render list of comments - fetched from API */}
      {comments.map((comment) => {
        return (
          <li key={comment.id}>
            <p>{comment.title}</p>
            <div>
              By <address>{comment.user}</address>
            </div>
          </li>
        );
      })}
      <li>
        <p>My comment is amazing!</p>
        <div>
          By <address>Maximilian</address>
        </div>
      </li>
      <li>
        <p>My comment is amazing!</p>
        <div>
          By <address>Maximilian</address>
        </div>
      </li>
    </ul>
  );
}

export default CommentList;
