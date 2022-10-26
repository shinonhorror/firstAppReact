import React from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useFetching } from "../components/hooks/useFetching";
import PostService from "../API/PostService";
import { useState } from "react";
import Loader from "./../components/UI/loader/Loader";

const PostIdPage = () => {
  const params = useParams();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [fetchPostById, isLoading, error] = useFetching(async () => {
    const response = await PostService.getById(params.id);
    setPost(response.data);
  });
  const [fetchComments, isCommentsLoading, commentsError] = useFetching(
    async () => {
      const response = await PostService.getCommentsById(params.id);
      setComments(response.data);
    }
  );
  useEffect(() => {
    fetchPostById(params.id);
    fetchComments(params.id);
  }, []);

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <h1> {post.title}</h1>
          <div>{post.body}</div>
        </div>
      )}
      {isCommentsLoading ? (
        <Loader />
      ) : (
        <div style={{marginTop:"50px"}}>
          {comments.map((comment) => (
            <div key={comment.id}>
              <h4>
                Имя: {comment.name}, почта: {comment.email}
              </h4>
              <div>{comment.body}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostIdPage;
