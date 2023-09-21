import React, { useState } from "react";
import api from "../services/api";
import { Link, useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.login(email, password);
      console.log("Logged in successfully:", response.status, email);
      navigate("/");
      window.location.reload();
    } catch (error) {
      // Handle login error
      console.error("Login failed:", error.message);
      setAuth(true);
    }

    // Reset the form
    setEmail("");
    setPassword("");
  };
  return (
    <div className="hero min-h-screen bg-base">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <img className="mask mask-circle w-48" src="/logo.png" />
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold-sans text-Stone">Login now!</h1>
          <p className="py-6 text-Stone font-sans">
            Sharing the expenses with your friends!
          </p>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-Emerald">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-Stone">Email</span>
                </label>
                <input
                  type="text"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-Stone">Password</span>
                </label>
                <input
                  type="password"
                  value={password}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label className="label">
                  <Link
                    to="/register"
                    className="label-text-alt link link-hover text-Stone"
                  >
                    Join us here
                  </Link>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="bg-Emerald2 btn btn-primary" type="submit">
                  Login
                </button>
              </div>
            </form>
            {auth && (
              <label className="text-rose-500">Email or Password Wrong!!</label>
            )}
          </div>
        </div>
        <label className="label">
          <Link to="/reset" className="label-text-right text-Stone">
            Forgot password
          </Link>
        </label>
      </div>
    </div>
  );
};
