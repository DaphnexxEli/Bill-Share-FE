import React from "react";

const CardContainer = () => {
  return (
    <div className="container flex justify-center">
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <div class="card w-96 bg-base-100 shadow-xl image-full">
             
                <div class="card-body">
                  <h2 class="card-title">Create a party</h2>
                        <img src="../public/team.png"alt="team" style={{ width: '100px', height: '100px' }}/>
                  <div class="card-actions justify-end">
                    <button class="btn btn-primary">Apply</button>
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
                  <h2 class="card-title">Join a group</h2>
                  <img src="../public/add-group.png" alt="team" style={{ width: '100px', height: '100px' }}/>
                  <div class="card-actions justify-end">
                    <button class="btn btn-primary">Apply</button>
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

export default CardContainer;
