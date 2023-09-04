import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { LoginPage } from "./LoginPage";
import ReactApexChart from "react-apexcharts";
import { YearPicker, MonthPicker } from "react-dropdown-date";

export const Static = () => {
  const [partylist, setpartylist] = useState([]);
  const navigate = useNavigate();
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const [date, setDate] = useState({
    year: currentYear.toString(),
    month: currentMonth.toString(),
  });

  const [foodData, setFoodData] = useState({ number: 0, total: 0 });
  const [rantalData, setRentalData] = useState({ number: 0, total: 0 });
  const [serviceData, setServiceData] = useState({ number: 0, total: 0 });

  useEffect(() => {
    const fetchPartyList = async () => {
      try {
        const data = await api.getHistory();
        // console.log(data);

        if (data) {
          // Filter
          const filteredData = data.filter((party) => {
            const partyDate = new Date(party.party.timeCreate);
            const partyYear = partyDate.getFullYear();
            const partyMonth = partyDate.getMonth();

            return (
              partyYear.toString() === date.year &&
              partyMonth.toString() === date.month
            );
          });

          const sumFood = filteredData.reduce((accumulator, party) => {
            const cost = parseFloat(party.cost);
            return party.party.type === "F" ? accumulator + cost : accumulator;
          }, 0);
          const countFood = filteredData.reduce((count, party) => {
            return party.party.type === "F" ? count + 1 : count;
          }, 0);
          setFoodData({ number: countFood, total: sumFood });

          const sumRental = filteredData.reduce((accumulator, party) => {
            const cost = parseFloat(party.cost);
            return party.party.type === "H" ? accumulator + cost : accumulator;
          }, 0);
          const countRental = filteredData.reduce((count, party) => {
            return party.party.type === "H" ? count + 1 : count;
          }, 0);
          setRentalData({ number: countRental, total: sumRental });

          const sumService = filteredData.reduce((accumulator, party) => {
            const cost = parseFloat(party.cost);
            return party.party.type === "S" ? accumulator + cost : accumulator;
          }, 0);
          const countService = filteredData.reduce((count, party) => {
            return party.party.type === "S" ? count + 1 : count;
          }, 0);
          setServiceData({ number: countService, total: sumService });
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchPartyList();
  }, [date]);

  function handleOnclick() {
    navigate("/history");
  }

  const token = localStorage.getItem("access_token");
  if (!token) {
    return <LoginPage />;
  }

  const donutOptions = {
    labels: ["Food & Drink", "Home & Rental", "Subscribion & Service"],
    // dataLabels: {
    //   enabled: true,
    //   dropShadow: {
    //     enabled: false,
    //   },
    // },
    plotOptions: {
      pie: {
        customScale: 0.8,
        donut: {
          labels: {
            show: true,
            showAlways: true,
            total: {
              show: true,
              label: "Spent",
              color: "#000",
            },
          },
        },
      },
    },
    colors: ["#FF7F50", "#66DA26", "#6495ED"],
  };

  const donutSeries = [foodData.total, rantalData.total, serviceData.total];

  return (
    <div className="container flex justify-center bg-Amber h-screen">
      <div className="w-2/3 mt-10 bg-Emerald2 rounded-2xl p-10">
        <h1 className="text-left text-4xl font-medium text-Nature">
          Monthly Report
        </h1>
        <div className="divider"></div>
        <div className="w-full my-5 ml-10">
          <MonthPicker
            numeric={false} // to get months as numbers
            endYearGiven // mandatory if end={} is given in YearPicker
            year={date.year} // mandatory
            value={date.month} // mandatory
            onChange={(month) => {
              // mandatory
              setDate((prev) => ({ ...prev, month }));
            }}
            id={"month"}
            classes={"select select-bordered"}
            optionClasses={"option"}
          />
          <YearPicker
            start={2000} // default is 1900
            reverse // default is ASCENDING
            value={date.year} // mandatory
            onChange={(year) => {
              // mandatory
              setDate((prev) => ({ ...prev, year }));
            }}
            id={"year"}
            classes={"ml-1 select select-bordered"}
            optionClasses={"option"}
          />
        </div>
        <div className="h-5/6 mt-10 p-10">
          <ReactApexChart
            className={"bg-white rounded-lg"}
            options={donutOptions}
            series={donutSeries}
            type="donut"
            width={400}
            height={300}
          />
          <div className="rounded-lg mt-28">
            <h1 className="my-3 text-white font-semibold">
              Sort by catagories
            </h1>
            <div className="my-1 h-20 bg-Green rounded-lg grid grid-cols-5 justify-items-center content-center">
              <div className="h-full col-span-4 grid grid-cols-4 ">
                <div className="avatar placeholder col-span-1">
                  <div className="bg-white text-neutral-content rounded-full w-12">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6 fill-warning"
                    >
                      <path d="M15 1.784l-.796.796a1.125 1.125 0 101.591 0L15 1.784zM12 1.784l-.796.796a1.125 1.125 0 101.591 0L12 1.784zM9 1.784l-.796.796a1.125 1.125 0 101.591 0L9 1.784zM9.75 7.547c.498-.02.998-.035 1.5-.042V6.75a.75.75 0 011.5 0v.755c.502.007 1.002.021 1.5.042V6.75a.75.75 0 011.5 0v.88l.307.022c1.55.117 2.693 1.427 2.693 2.946v1.018a62.182 62.182 0 00-13.5 0v-1.018c0-1.519 1.143-2.829 2.693-2.946l.307-.022v-.88a.75.75 0 011.5 0v.797zM12 12.75c-2.472 0-4.9.184-7.274.54-1.454.217-2.476 1.482-2.476 2.916v.384a4.104 4.104 0 012.585.364 2.605 2.605 0 002.33 0 4.104 4.104 0 013.67 0 2.605 2.605 0 002.33 0 4.104 4.104 0 013.67 0 2.605 2.605 0 002.33 0 4.104 4.104 0 012.585-.364v-.384c0-1.434-1.022-2.7-2.476-2.917A49.138 49.138 0 0012 12.75zM21.75 18.131a2.604 2.604 0 00-1.915.165 4.104 4.104 0 01-3.67 0 2.604 2.604 0 00-2.33 0 4.104 4.104 0 01-3.67 0 2.604 2.604 0 00-2.33 0 4.104 4.104 0 01-3.67 0 2.604 2.604 0 00-1.915-.165v2.494c0 1.036.84 1.875 1.875 1.875h15.75c1.035 0 1.875-.84 1.875-1.875v-2.494z" />
                    </svg>
                  </div>
                </div>
                <div className="col-span-1">
                  <p className="text-Stone font-normal">Food</p>
                  <p>{foodData.number} payments</p>
                </div>
              </div>
              <div className="col-span-1">
                <button className="btn btn-sm" onClick={() => handleOnclick()}>
                  {foodData.total}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.75 12a.75.75 0 01.75-.75h13.19l-5.47-5.47a.75.75 0 011.06-1.06l6.75 6.75a.75.75 0 010 1.06l-6.75 6.75a.75.75 0 11-1.06-1.06l5.47-5.47H4.5a.75.75 0 01-.75-.75z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="my-1 h-20 bg-Green rounded-lg grid grid-cols-5 justify-items-center content-center">
              <div className="h-full col-span-4 grid grid-cols-4 ">
                <div className="avatar placeholder col-span-1">
                  <div className="bg-white text-neutral-content rounded-full w-12">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6 fill-Emerald"
                    >
                      <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                      <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
                    </svg>
                  </div>
                </div>
                <div className="col-span-1">
                  <p className="text-Stone font-normal">Rental</p>
                  <p>{rantalData.number} payments</p>
                </div>
              </div>
              <div className="col-span-1">
                <button className="btn btn-sm" onClick={() => handleOnclick()}>
                  {rantalData.total}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.75 12a.75.75 0 01.75-.75h13.19l-5.47-5.47a.75.75 0 011.06-1.06l6.75 6.75a.75.75 0 010 1.06l-6.75 6.75a.75.75 0 11-1.06-1.06l5.47-5.47H4.5a.75.75 0 01-.75-.75z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="my-1 h-20 bg-Green rounded-lg grid grid-cols-5 justify-items-center content-center">
              <div className="h-full col-span-4 grid grid-cols-4 ">
                <div className="avatar placeholder col-span-1">
                  <div className="bg-white text-neutral-content rounded-full w-12">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6 fill-info"
                    >
                      <path
                        fillRule="evenodd"
                        d="M1.5 5.625c0-1.036.84-1.875 1.875-1.875h17.25c1.035 0 1.875.84 1.875 1.875v12.75c0 1.035-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 18.375V5.625zm1.5 0v1.5c0 .207.168.375.375.375h1.5a.375.375 0 00.375-.375v-1.5a.375.375 0 00-.375-.375h-1.5A.375.375 0 003 5.625zm16.125-.375a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375h1.5A.375.375 0 0021 7.125v-1.5a.375.375 0 00-.375-.375h-1.5zM21 9.375A.375.375 0 0020.625 9h-1.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375h1.5a.375.375 0 00.375-.375v-1.5zm0 3.75a.375.375 0 00-.375-.375h-1.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375h1.5a.375.375 0 00.375-.375v-1.5zm0 3.75a.375.375 0 00-.375-.375h-1.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375h1.5a.375.375 0 00.375-.375v-1.5zM4.875 18.75a.375.375 0 00.375-.375v-1.5a.375.375 0 00-.375-.375h-1.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375h1.5zM3.375 15h1.5a.375.375 0 00.375-.375v-1.5a.375.375 0 00-.375-.375h-1.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375zm0-3.75h1.5a.375.375 0 00.375-.375v-1.5A.375.375 0 004.875 9h-1.5A.375.375 0 003 9.375v1.5c0 .207.168.375.375.375zm4.125 0a.75.75 0 000 1.5h9a.75.75 0 000-1.5h-9z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
                <div className="col-span-1">
                  <p className="text-Stone font-normal">Service</p>
                  <p>{serviceData.number} payments</p>
                </div>
              </div>
              <div className="col-span-1">
                <button className="btn btn-sm" onClick={() => handleOnclick()}>
                  {serviceData.total}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.75 12a.75.75 0 01.75-.75h13.19l-5.47-5.47a.75.75 0 011.06-1.06l6.75 6.75a.75.75 0 010 1.06l-6.75 6.75a.75.75 0 11-1.06-1.06l5.47-5.47H4.5a.75.75 0 01-.75-.75z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
