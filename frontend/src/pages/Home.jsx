import React from "react";
import JoinByCodeOrQRCode from "./joinPartypage";
import CreatePartyPage from "./createParty";

export const Home = () => {
  return (
    <div>
      <div>
        <JoinByCodeOrQRCode />
      </div>
      <div classname="">
        <CreatePartyPage />
      </div>
    </div>
  );
};
