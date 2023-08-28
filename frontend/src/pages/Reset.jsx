import React, { useState } from "react";
import api from "../services/api";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";

export const ResetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conpassword, setConPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
    navigate("/");
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (password !== conpassword) {
      setMessage("The password and confirmation password do not match.");
      return;
    }

    try {
      await api.resetpass(email, password);
      setIsOpen(true)
      setEmail("");
      setPassword("");
      setConPassword("");
    } catch (error) {
      setMessage("There was an error resetting the password.");

    }
  };

  return (
    <div className="hero min-h-screen bg-base">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <h1 className="text-5xl font-bold">Forgot password</h1>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-Emerald2">
          <div className="card-body">
            <form onSubmit={handleResetPassword}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-white">Email</span>
                </label>
                <input
                  type="email"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-white">New Password</span>
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
                  <span className="label-text text-white">Confirmed Password</span>
                </label>
                <input
                  type="password"
                  value={conpassword}
                  required
                  onChange={(e) => setConPassword(e.target.value)}
                />
              </div>
              <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary bg-Green">
                  Reset password
                </button>
              </div>
              {message && <p>{message}</p>}
              <Modal
                  isOpen={isOpen}
                  onRequestClose={closeModal}
                  ariaHideApp={false}
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
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
