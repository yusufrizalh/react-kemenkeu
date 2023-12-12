import React from "react";
import { useParams } from "react-router-dom";
import UseFetch from "../layouts/UseFetch";

const BlogDetail = () => {
  const { id } = useParams();
  const {
    data: blog,
    isLoading,
    isError,
  } = UseFetch(`http://localhost:3000/blogs/${id}`);

  return (
    <React.Fragment>
      <div className="blog-details">
        <h2>Blog Detail | ID {id}</h2>
        {isError && (
          <div>
            <h2>{isError}</h2>
          </div>
        )}
        {isLoading && (
          <div>
            <h2>Loading.....</h2>
          </div>
        )}
        {blog && (
          <article>
            <h2>{blog.title}</h2>
            <p>Written by {blog.author}</p>
            <div>
              <p>{blog.body}</p>
            </div>
          </article>
        )}
      </div>
    </React.Fragment>
  );
};

export default BlogDetail;
