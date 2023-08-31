import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import QRCode from "react-qr-code";
import generatePayload from "promptpay-qr";
import api from "../services/api";

export function SummarizeBill() {
  const navigate = useNavigate();
  const [total, setTotal] = useState(0);
  const [orderList, setOrderlist] = useState([]);
  const [memberList, setMemberlist] = useState([]);
  // const [amount, setAmount] = useState(10);
  const [phoneNumber, setPhoneNumber] = useState("0972627764");
  const [qrCode, setqrCode] = useState("sample");

  const partyCode = localStorage.getItem("code");
  const [partyName, setPartyName] = useState("Name");
  const [partyDate, setPartyDate] = useState("01-01-2022");
  const [partyHost, setPartyHost] = useState();
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchBillDetail = async () => {
      try {
        //Set Bill detail
        const party = await api.getParty(partyCode);
        setPartyName(party.partyName);
        setPartyDate(party.timeCreate);
        setPhoneNumber(party.promptPay);
        setOrderlist(party.orderList);
        setPartyHost(party.hostID);
        const sum = party.orderList.reduce(
          (accumulator, order) => accumulator + parseFloat(order.price),
          0
        );
        setTotal(sum);

        const members = await api.getMemberList(party.id);
        setMemberlist(members);
      } catch (error) {
        console.error(error);
        alert("An error occurred while fetching data. Please try again later.");
        navigate("/");
      }
    };

    if (partyCode) {
      fetchBillDetail();
    }
  }, [partyCode]);

  function handleQR(amount) {
    setqrCode(generatePayload(phoneNumber, { amount }));
  }

  const copyPhone = () => {
    navigator.clipboard.writeText(phoneNumber);
    alert(`Code ${phoneNumber} copied to clipboard`);
  };

  const handleUploadImage = async (memberID, slipImage) => {
    try {
      const response = await api.uploadImage(memberID, slipImage);

      console.log("Upload image success:", response);
    } catch (error) {
      console.error("Upload image fail:", error);
    }
  };

  return (
    <div className="container flex justify-center bg-Green h-screen">
      <div className="w-2/3">
        <h1 className=" text-center text-4xl mt-10">Summarize</h1>
        <h3 className=" text-center text-2xl text-Stone mt-10">{partyName}</h3>
        <h3 className=" text-center text-md text-Stone">{partyDate}</h3>
        <h3 className=" text-center text-2xl text-Stone my-3">{total}฿</h3>

        <div className="bg-neutral rounded-xl h-auto">
          <div className="flex justify-between p-5">
            <div className="ml-5">Member name</div>
            <div className="mr-10">Pay</div>
          </div>
          {memberList.map((member) => (
            <div
              key={member.id}
              className="collapse collapse-arrow bg-base-200"
              onClick={() => handleQR(parseFloat(member.cost))}
            >
              <input type="radio" name="my-accordion-3" />
              <div className="collapse-title text-xl font-medium flex h-18">
                <div className="flex w-5/6">
                  <div
                    className={
                      member.slipImage
                        ? "avatar online placeholder"
                        : "avatar offline placeholder"
                    }
                  >
                    <div
                      className={
                        member.userID.id === partyHost
                          ? "bg-neutral-focus text-neutral-content rounded-full h-12 w-12 ring ring-primary ring-offset-base-100 ring-offset-2"
                          : "bg-neutral-focus text-neutral-content rounded-full h-12 w-12"
                      }
                    >
                      <span>{member.userID.first_name.charAt(0)}</span>
                    </div>
                  </div>
                  <div className="pl-6">{member.userID.first_name}</div>
                </div>
                <div className="pl-14">{member.cost}฿</div>
              </div>
              <div className="collapse-content bg-base-100">
                <div className="overflow-x-auto">
                  <table className="table">
                    {/* head */}
                    <thead>
                      <tr>
                        <th></th>
                        <th>Order Name</th>
                        <th></th>
                        <th>Price</th>
                        <th>Pay</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* row */}
                      {orderList
                        .filter((id) =>
                          id.pay.includes(member.userID.first_name)
                        )
                        .sort((a, b) => a.id - b.id)
                        .map((order) => (
                          <tr key={order.id}>
                            <th>{order.id}</th>
                            <td>{order.name}</td>
                            <td></td>
                            <td>{parseFloat(order.price).toFixed(2)}</td>
                            <td>{parseFloat(order.cost).toFixed(2)}</td>
                          </tr>
                        ))}
                      <tr>
                        <th></th>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {member.slipImage ? (
                  <div className="flex justify-center my-3">
                    
                  </div>
                ) : (
                  <div>
                    <div className="flex justify-center">
                      <QRCode className="my-3 p-3 bg-white" value={qrCode} />
                    </div>
                    <div className="flex justify-center">
                      <h3
                        className="w-1/3 rounded-md text-center text-white cursor-pointer bg-Emerald"
                        onClick={copyPhone}
                      >
                        {phoneNumber} ↀ
                      </h3>
                    </div>
                    <div className="flex justify-center my-3">
                      <input
                        type="file"
                        accept="image/jpeg,image/png"
                        className="file-input file-input-bordered w-full max-w-xs"
                        onChange={(e) => setSelectedImage(e.target.files[0])}
                      />
                      <button
                        className="btn mx-2"
                        onClick={() =>
                          selectedImage &&
                          handleUploadImage(member.id, selectedImage)
                        }
                      >
                        Upload
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <Link to="/" className="">
            <button className="btn btn-primary bg-Emerald2 w-full">Home</button>{" "}
          </Link>
        </div>
      </div>
    </div>
  );
}
