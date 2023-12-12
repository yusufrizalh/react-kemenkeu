import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const BlogCreate = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("");
  const navigate = useNavigate();

  const handleFormSubmit = (event) => {
    event.preventDefault(); // menghindari reload
    const blog = { title, body, author };
    console.log(blog);
    fetch("http://localhost:3000/blogs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(blog),
    })
      .then(() => {
        console.log("New blog was added");
        navigate("/"); // redirect ke halaman home
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <React.Fragment>
      <form className="create" onSubmit={handleFormSubmit}>
        <h2>Create New Blog</h2>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          name="title"
          required
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <label htmlFor="body">Body:</label>
        <textarea
          name="body"
          cols="10"
          rows="3"
          value={body}
          onChange={(event) => setBody(event.target.value)}
        ></textarea>
        <select
          name="author"
          value={author}
          onChange={(event) => setAuthor(event.target.value)}
        >
          <option disabled defaultChecked>
            Choose One
          </option>
          <option value="Helena">Helena</option>
          <option value="Michael">Michael</option>
          <option value="Jessica">Jessica</option>
        </select>
        <button>Create Blog</button>
        <br />
        <br />
        <p>{title}</p>
        <p>{body}</p>
        <p>{author}</p>
      </form>
    </React.Fragment>
  );
};

export default BlogCreate;
