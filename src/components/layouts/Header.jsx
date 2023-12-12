import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <React.Fragment>
      <nav className="navbar">
        <h1>My React Web</h1>
        <div className="links">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link
            to="/create"
            style={{
              backgroundColor: "crimson",
              color: "white",
              borderRadius: "10px",
            }}
          >
            Create Blog
          </Link>
        </div>
      </nav>
    </React.Fragment>
  );
};

export default Header;
