import React from "react";
import { Link } from "react-router-dom";

export const CardContainer = () => {
  return (
    <div className="container bg-Green flex justify-center">
      <div className="row">
        <div className="col-md-6">
          <h1 className="text-Stone">
            {" "}
            Let's figure out a fair way to divide the costs for the expenses
          </h1>

          <div className="card">
            <div className="card-body">
              <div className="card w-96 bg-base-100 shadow-xl image-full">
                <div className="card-body">
                  <h2 className="card-title">Create a party</h2>
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
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <div className="card w-96 bg-base-100 shadow-xl image-full">
                <div className="card-body">
                  <h2 className="card-title">Join a group</h2>
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
