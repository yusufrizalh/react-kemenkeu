import React from "react";
import { Link } from "react-router-dom";

const BlogList = ({ blogs, title, deleteBlog }) => {
  return (
    <React.Fragment>
      <div className="blog-list">
        <h2>{title}</h2>
        {blogs.map((item) => (
          <div className="blog-preview" key={item.id}>
            <Link to={`/blogs/${item.id}`}>
              <h2>{item.title}</h2>
              <p>Written by {item.author}</p>
              <button onClick={() => deleteBlog(item.id)}>Delete</button>
            </Link>
          </div>
        ))}
      </div>
    </React.Fragment>
  );
};

export default BlogList;
