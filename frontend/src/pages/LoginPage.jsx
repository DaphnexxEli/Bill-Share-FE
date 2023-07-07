import React, { useState } from "react";
import api from "../services/api";
import { Link, useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userToken, setUserToken] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.login(email, password);

      // store user token in local storage or state
      localStorage.setItem("first_name", response.first_name);
      localStorage.setItem("email", response.email);
      localStorage.setItem("userToken", response.jwt);
      localStorage.setItem("phone", response.phone);
      localStorage.setItem("is_staff", response.is_staff);
      setUserToken(response.jwt);

      console.log("Logged in successfully:", response);
      navigate("/cardcontainer");
      window.location.reload();
    } catch (error) {
      // Handle login error
      console.error("Login failed:", error.message);
    }

    // Reset the form
    setEmail("");
    setPassword("");
  };
  return (
    <div className="hero min-h-screen bg-Green">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold text-Stone">Login now!</h1>
          <p className="py-6 text-Stone">
            A web app for sharing expenses simplifies the process of managing
            shared financial responsibilities, promotes fairness, and enhances
            collaboration among individuals involved in shared expenses
            scenarios.
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
