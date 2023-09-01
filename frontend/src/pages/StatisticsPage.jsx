import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { LoginPage } from "./LoginPage";
import ReactApexChart from "react-apexcharts";

export const Static = () => {
  const [partylist, setpartylist] = useState([]);
  const navigate = useNavigate();

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

  const donutOptions = {
    labels: ["Apple", "Banana", "Cherry"],
    title: {
      text: "hello",
      align: 'left',
      margin: 10,
      offsetX: 0,
      offsetY: 0,
      floating: false,
      style: {
        fontSize:  '14px',
        fontWeight:  'bold',
        fontFamily:  undefined,
        color:  '#263238'
      },
  }
  };

  const donutSeries = [44, 55, 13];

  return (
    <div className="container flex justify-center bg-Emerald h-screen">
      <div className="w-2/3 mt-10 bg-Emerald2 rounded-2xl p-10">
        <h1 className="text-left text-4xl font-medium text-Nature">Monthly Report</h1>
        <div className="divider"></div>
        <div className="bg-Amber w-full my-5">
          <input type="month" />
        </div>
        <div className="h-5/6 mt-10 p-10">
          <ReactApexChart
            className={"bg-white rounded-lg"}
            options={donutOptions}
            series={donutSeries}
            type="donut"
            width="380"
          />
        </div>
        <div></div>
      </div>
    </div>
  );
};
