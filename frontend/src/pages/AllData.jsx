import React from "react";
import { Link } from "react-router-dom";
import { LoginPage } from "./LoginPage";

export const Data = () => {
  const token = localStorage.getItem("userToken");
  if (!token) {
    return <LoginPage />;
  }
  return (
    <div className="container flex justify-center">
      <h1> Lists of restaurant </h1>
    </div>
  );
};
