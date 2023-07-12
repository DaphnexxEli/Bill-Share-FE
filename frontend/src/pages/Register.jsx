import React, { useState } from "react";
import api from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import Modal from "react-modal";

export const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [first_name, setName] = useState("");
  const [last_name, setLast] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
    navigate("/");
    window.location.reload();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsOpen(true);

    try {
      const response = await api.register(
        first_name,
        last_name,
        email,
        password,
        phone
      );

      console.log("Signed in successfully:", response);
    } catch (error) {
      // Handle login error
      console.error("Sign in failed:", error.message);
      navigate("/");
    }

    // Reset the form
    setEmail("");
    setPassword("");
    setName("");
    setPhone("");
  };
  return (
    <div className="hero min-h-screen bg-Green">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Join us now!</h1>
    
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
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-Stone">First Name</span>
                </label>
                <input
                  type="text"
                  value={first_name}
                  required
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-Stone">Last Name</span>
                </label>
                <input
                  type="text"
                  value={last_name}
                  required
                  onChange={(e) => setLast(e.target.value)}
                />
              </div>
              
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-Stone">Phone</span>
                </label>
                <input
                  type="text"
                  value={phone}
                  required
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              
              <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary">
                  Join us
                </button>
                <Modal
                  isOpen={isOpen}
                  onRequestClose={closeModal}
                  className="flex justify-center items-center h-screen"
                >
                  <div className="card w-96 bg-neutral text-neutral-content">
                    <div className="card-body items-center text-center">
                      <h2 className="card-title">Successful</h2>
                      <img
                        src="../public/checked.png"
                        alt="team"
                        style={{ width: "100px", height: "100px" }}
                      />
                      <div className="card-actions justify-end">
                        <button
                          className="btn btn-primary"
                          onClick={closeModal}
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                </Modal>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
