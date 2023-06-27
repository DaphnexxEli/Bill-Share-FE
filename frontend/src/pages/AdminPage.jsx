import React from "react";
import { Link } from "react-router-dom";



export const ForAdmin = () => {
  return (
    <div className="container flex justify-center">
      <div className="row">
        <div className="col-md-6">
          
        <h1 className=""> For admin to add new menu and see all users' feedback</h1>

          <div className="card">
            <div className="card-body">
              <div class="card w-96 bg-base-100 shadow-xl image-full">
                <div class="card-body">
                  <h2 class="card-title">Add new menu</h2>
                        <img src="../public/add-menu.png"alt="add" style={{ width: '100px', height: '100px' }}/>
                  <div class="card-actions justify-end">
                  <Link to="/newMenu">
                    <button class="btn btn-primary">Apply</button>
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
              <div class="card w-96 bg-base-100 shadow-xl image-full">
                
                <div class="card-body">
                  <h2 class="card-title">All data</h2>
                  <img src="../public/opinion.png" alt="opinion" style={{ width: '100px', height: '100px' }}/>
                  <div class="card-actions justify-end">
                  <Link to="/data ">
                    <button class="btn btn-primary">Apply</button>
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



