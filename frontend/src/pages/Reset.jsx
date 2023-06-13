import React, { useState } from "react";

export const ResetPassword = () => {

  const [email, setEmail] = useState("");
  const [resetSent, setResetSent] = useState(false);
  const [password, setPassword] = useState('');


  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleResetPassword = (e) => {
    e.preventDefault();

    setTimeout(() => {
      setResetSent(true);
    }, 2000);
  };


 
  return (
    <div className="hero min-h-screen bg-base-200">
      {/* {resetSent ? ( */}
        <div className="hero-content flex-col lg:flex-row-reverse">
        <h1 className="text-5xl font-bold">Forgot password</h1>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
              <form onSubmit={handleResetPassword}>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="text"
                    value={email}
                    required
                    onChange={handleEmailChange}
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">New Password</span>
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
                    <span className="label-text">Confirmed Password</span>
                  </label>
                  <input
                    type="password"
                    value={password}
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary">
                  Reset password
                </button>
              </div>
              </form>
            </div>
          </div>
        </div>
    {/* ):null} */}
    
    </div>
  );
};

  

