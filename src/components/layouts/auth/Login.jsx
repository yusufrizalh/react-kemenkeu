import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const loginUser = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:3001/login", {
        email: email,
        password: password,
      });
      navigate("/dashboard");
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
                <strong>Login</strong>
              </div>
              <div className="card-body">
                <form onSubmit={loginUser}>
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
                    <p>
                      <input
                        type="checkbox"
                        name="submit"
                        id="submit"
                        className="form-check-input"
                        value=""
                      />
                      &nbsp; Remember me
                    </p>
                  </div>
                  <div className="mb-3">
                    <button type="submit" className="btn btn-md btn-primary">
                      Login
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

export default Login;
