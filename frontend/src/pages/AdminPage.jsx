import React from "react";
import { Link } from "react-router-dom";

export const ForAdmin = () => {
  return (
    <div className="container bg-Green flex justify-center h-screen">
      <div className="row">
        <div className="col-md-6">
       

        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <div className="card w-96 bg-base-100 shadow-xl image-full">
                <div className="card-body">
                  <h2 className="card-title text-white ">Restarant list</h2>
                  <img
                    src="../public/opinion.png"
                    alt="opinion"
                    style={{ width: "100px", height: "100px"}}
                  />
                  <div className="card-actions justify-end">
                    <Link to="/data ">
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
