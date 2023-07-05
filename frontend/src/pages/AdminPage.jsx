import React from "react";
import { Link } from "react-router-dom";



export const ForAdmin = () => {
  return (
    <div className="container bg-Green flex justify-center">
      <div className="row">
        <div className="col-md-6">
          
        <h1 className="text-Stone"> For admin to add new menu and see lists </h1>

          <div className="card">
            <div className="card-body">
              <div className="card w-96 bg-base-100 shadow-xl image-full">
                <div className="card-body">
                  <h2 className="card-title">Add new menu</h2>
                        <img src="../public/add-menu.png"alt="add" style={{ width: '100px', height: '100px' }}/>
                  <div className="card-actions justify-end">
                  <Link to="/newMenu">
                    <button className="btn btn-primary bg-Emerald">Apply</button>
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
                  <h2 className="card-title">All data</h2>
                  <img src="../public/opinion.png" alt="opinion" style={{ width: '100px', height: '100px' }}/>
                  <div className="card-actions justify-end">
                  <Link to="/data ">
                    <button className="btn btn-primary bg-Emerald">Apply</button>
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



