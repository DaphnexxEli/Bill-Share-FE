import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { RadialChart } from "react-vis";

export const Static = () => {
  const [partylist, setpartylist] = useState([]);
  const navigate = useNavigate();
  const myData = [
    { angle: 100, innerRadius: 0.8, color: 1 },
    { angle: 70, innerRadius: 0.8, color:2 },
    { angle: 50, innerRadius: 0.8, color:3 },
  ];

  useEffect(() => {
    const fetchPartyList = async () => {
      try {
        const data = await api.getHistory();
        setpartylist(data);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };

    if (partylist) {
      fetchPartyList();
    }
  }, []);

  function handleOnclick(partyCode) {
    localStorage.setItem("code", partyCode);
    navigate("/summarizeBill");
  }

  const token = localStorage.getItem("access_token");
  if (!token) {
    return <LoginPage />;
  }

  return (
    <div className="container flex justify-center bg-Emerald h-screen">
      <div className="w-2/3 mt-10 bg-Emerald2 rounded-2xl p-10">
        <h1 className="text-left text-4xl font-medium text-Nature">Static</h1>
        <div className="divider"></div>
        <div className="h-5/6 mt-10 p-10">
          <RadialChart className={"bg-white"} data={myData} width={300} height={300} showLabels={true} />
        </div>
      </div>
    </div>
  );
};
