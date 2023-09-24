import React, { useState, useEffect } from "react";
import api from "../services/api";
import { LoginPage } from "./LoginPage";
import { useNavigate } from "react-router-dom";

export const History = () => {
  const [partylist, setpartylist] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPartyList = async () => {
      try {
        const data = await api.getHistory();
        setpartylist(data);
        // console.log(data);
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
    <div className="container flex justify-center bg-Green h-screen">
      <div className="w-2/3 my-10 h-4/5 bg-Emerald2 rounded-2xl p-10">
        <h1 className="text-left text-4xl font-medium text-white">
          History Record
        </h1>
        <div className="divider"></div>
        <div className="overflow-x-auto h-5/6 mt-10">
          <ul className="">
            {partylist.length !== 0 ? (
              partylist.map((data) => (
                <li
                  key={data.id}
                  className="w-full h-24 flex justify-between my-2 rounded-xl bg-neutral hover:bg-neutral-focus cursor-pointer"
                  onClick={() => handleOnclick(data.party.Code)}
                >
                  <div className="p-5 place-item-center text-white">
                    <p>{data.party.partyName}</p>
                  </div>
                  <div className="w-1/3 text-center text-lg border-l border-semiblack text-white">
                    {data.party.hostID === data.userID ? (
                      <p>host</p>
                    ) : (
                      <p>member</p>
                    )}
                    <div className="divider my-0"></div>
                    <p>{data.party.timeCreate}</p>
                  </div>
                </li>
              ))
            ) : (
              <li className="w-full h-24 flex justify-center my-2 rounded-xl">
                <div className="p-5 place-item-center text-white">
                  <p>Not have bill now...</p>
                </div>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};
