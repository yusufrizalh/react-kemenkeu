import React, { useState, useEffect } from "react";
import BlogList from "./BlogList";
import UseFetch from "../layouts/UseFetch";

const Home = () => {
  const handleDelete = (id) => {
    const newBlogs = blogs.filter((blog) => blog.id !== id);
    setBlogs(newBlogs);
  };

  const {
    data: blogs,
    isLoading,
    isError,
  } = UseFetch("http://localhost:3000/blogs");

  return (
    <React.Fragment>
      <div className="home">
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
        {blogs && (
          <BlogList blogs={blogs} title="All Blogs" deleteBlog={handleDelete} />
        )}
        {blogs && (
          <BlogList
            blogs={blogs.filter((blog) => blog.author === "Jennifer")}
            title="Jennifer's Blogs"
          />
        )}
      </div>
    </React.Fragment>
  );
};

export default Home;
