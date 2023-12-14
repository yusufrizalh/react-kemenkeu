import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const registerUser = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:3001/users", {
        name: name,
        email: email,
        password: password,
        confPassword: confPassword,
      });
      alert("Successfully Register!");
      navigate("/");
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message);
        alert(error.response.data.message);
      }
    }
  };

  return (
    <React.Fragment>
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <div className="card">
              <div className="card-header">
                <strong>Register</strong>
              </div>
              <div className="card-body">
                <form onSubmit={registerUser}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      <strong>Name</strong>
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      autoComplete="off"
                      className="form-control"
                      required
                      placeholder="Enter your name"
                      onChange={(event) => setName(event.target.value)}
                      value={name}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      <strong>Email</strong>
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      autoComplete="off"
                      className="form-control"
                      required
                      placeholder="Enter your email"
                      onChange={(event) => setEmail(event.target.value)}
                      value={email}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      <strong>Password</strong>
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      autoComplete="off"
                      className="form-control"
                      required
                      placeholder="Enter your password"
                      onChange={(event) => setPassword(event.target.value)}
                      value={password}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="confPassword" className="form-label">
                      <strong>Confirm Password</strong>
                    </label>
                    <input
                      type="password"
                      name="confPassword"
                      id="confPassword"
                      autoComplete="off"
                      className="form-control"
                      required
                      placeholder="Enter your confirm password"
                      onChange={(event) => setConfPassword(event.target.value)}
                      value={confPassword}
                    />
                  </div>
                  <div className="mb-3">
                    <button type="submit" className="btn btn-md btn-primary">
                      Register
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Register;
