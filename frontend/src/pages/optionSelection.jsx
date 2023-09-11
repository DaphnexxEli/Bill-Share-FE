import React from "react";
import { Link } from "react-router-dom";

export const CardContainer = () => {
  return (
    <div className="container bg-base flex justify-center h-screen">
      <div className="row">
      <header className="bg-base p-4">
      <div className="container mx-auto">
      <nav className="flex items-center justify-between px-6">
      <div className="text-Stone font-bold-sans text-xl"> Welcome back! </div></nav> 
      <nav className="flex items-center justify-between">
       <div className="text-semiblack font-bold-sans text-m px-6"> Hello, {localStorage.getItem("first_name")}{" "}</div>
         
          </nav>
        </div>
        </header>

        <div className="card">
          <div className="card-body">
            <div className="card w-96 bg-Emerald2">
              <div className="card-body">
                <h2 className="card-title font-bold text-white">Create a party</h2>
                <img
                  src="../public/team.png"
                  alt="team"
                  style={{ width: "100px", height: "100px" }}
                />
                <div className="card-actions justify-end">
                  <Link to="/createParty">
                    <button className="btn btn-primary bg-Emerald">
                      Apply
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <div className="card w-96 bg-Emerald2">
                <div className="card-body">
                  <h2 className="card-title font-bold text-white">Join a group</h2>
                  <img
                    src="../public/add-group.png"
                    alt="team"
                    style={{ width: "100px", height: "100px" }}
                  />
                  <div className="card-actions justify-end">
                    <Link to="/joinByCodeOrQRCode ">
                      <button className="btn btn-primary bg-Emerald">
                        Apply
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
