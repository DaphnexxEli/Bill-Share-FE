import React from "react";

export const NetworkError = () => {
  return (
    <div className="container bg-base h-screen">
      <h1 className=" text-center font-bold text-4xl">Network Error</h1>
      <p className="text-center text-secondary-focus">
        There was a problem connecting to the network.
      </p>
    </div>
  );
};
