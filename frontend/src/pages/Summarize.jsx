import React, { useState } from "react";
import { Link } from "react-router-dom";
import QRCode from "react-qr-code";
import generatePayload from "promptpay-qr";

export function SummarizeBill() {
  const [total, setTotal] = useState(100);
  const [orderList, setOrderlist] = useState([]);
  const [memberList, setMemberlist] = useState([]);
  const [amount, setAmount] = useState(1.0);
  const [phoneNumber, setPhoneNumber] = useState("0972627764");
  const [qrCode, setqrCode] = useState("sample");

  function handleQR() {
    setqrCode(generatePayload(phoneNumber, {amount}));
  }

  const copyPhone = () => {
    navigator.clipboard.writeText(partyCode);
    alert(`Code ${partyCode} copied to clipboard`);
  };

  return (
    <div className="container flex justify-center bg-Green h-screen">
      <div className="w-2/3">
        <h1 className=" text-center text-4xl mt-10">Summarize</h1>
        <h3 className=" text-center text-2xl text-Stone my-3">{total}฿</h3>

        <div className="bg-neutral rounded-xl h-auto">
          <div className="flex justify-between p-5">
            <div className="ml-5">Member name</div>
            <div className="mr-10">Pay</div>
          </div>
          <div
            className="collapse collapse-arrow bg-base-200"
            onClick={handleQR}
          >
            <input type="checkbox" name="my-accordion-3" />
            <div className="collapse-title text-xl font-medium flex">
              <div className="flex w-5/6">
                <div className="avatar online placeholder">
                  <div className="bg-neutral-focus text-neutral-content rounded-full w-12">
                    <span>M</span>
                  </div>
                </div>
                <div className="pl-6">Member name</div>
              </div>
              <div className="pl-14">-- ฿</div>
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
                    </tr>
                  </thead>
                  <tbody>
                    {/* row 1 */}
                    <tr>
                      <th>1</th>
                      <td>Cy Ganderton</td>
                      <td></td>
                      <td>10</td>
                    </tr>
                    {/* row 2 */}
                    <tr>
                      <th>2</th>
                      <td>Hart Hagerty</td>
                      <td></td>
                      <td>10</td>
                    </tr>
                    {/* row 3 */}
                    <tr>
                      <th>3</th>
                      <td>Brice Swyre</td>
                      <td></td>
                      <td>10</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="flex justify-center">
                <QRCode className="my-3 p-3 bg-white" value={qrCode} />
              </div>

              <h3 className="w-full text-center text-white" onClick={copyPhone}>
                {phoneNumber}
              </h3>
            </div>
          </div>
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
