import React from "react";
import { LoginPage } from "./LoginPage";
import { CardContainer } from "./optionSelection";
import { ForAdmin } from "./AdminPage";
import { ImageNavigation } from "../components/ImageNavigation";

export const Home = () => {
  const token = localStorage.getItem("access_token");
  const is_staff = JSON.parse(localStorage.getItem("is_staff"));
  return (
    <div>
      {!token ? <LoginPage /> : is_staff ? <ForAdmin /> : <CardContainer />}
      <ImageNavigation />

    </div>
  );
};
