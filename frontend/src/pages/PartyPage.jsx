import React, { useState, useEffect } from "react";
import api from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import { LoginPage } from "./LoginPage";
import "../App.css";
import AddOrder from "../components/addOrderlist";
import QRCode from "react-qr-code";

const mockPeople = [
  { id: 1, name: "John", cost: 0 },
  { id: 2, name: "Jane", cost: 0 },
  { id: 3, name: "Bob", cost: 0 },
  { id: 4, name: "Alice", cost: 0 },
  { id: 5, name: "Mark", cost: 0 },
];

const data = [
  "Apple",
  "Banana",
  "Orange",
  "Pineapple",
  "Mango",
  "Grapes",
  "Watermelon",
];

const order = [
  { id: 1, name: "Apple", price: 200, cost: 100, pay: ["John", "Jane"] },
  { id: 2, name: "Banana", price: 100, cost: 100, pay: ["John"] },
  {
    id: 3,
    name: "Orange",
    price: 100,
    cost: 25,
    pay: ["John", "Jane", "Bob", "Alice"],
  },
];

export const PartyPage = () => {
  const navigate = useNavigate();
  const [partyName, setPartyName] = useState("");
  const [partyType, setPartyType] = useState("");
  const [partyHost, setPartyHost] = useState("");
  const [partyMenu, setPartyMenu] = useState("");
  const partyCode = localStorage.getItem("code");

  // useEffect(() => {
  //   const fetchOrderList = async () => {
  //     try {
  //       const data = await api.getParty();
  //       setPartyName(data.partyName);
  //       setPartyType(data.type);
  //       setPartyHost(data.host);
  //       setPartyMenu(data.menu);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   const fetchMenuRestaurants = async () => {
  //     try {
  //       const data = await api.get
  //     } catch (error) {

  //     }
  //   }

  //   fetchOrderList();
  // }, []);

  const [memberlist, setMemberlist] = useState(mockPeople);

  const [orderList, setOrderlist] = useState(order);

  const [menuTap, setMenuTap] = useState(true);

  // menu order
  const [showAddOrder, setShowAddOrder] = useState(false);
  const [menuID, setMenuID] = useState();
  const [menuName, setName] = useState("");
  const [menuPrice, setPrice] = useState(0);
  const [menuPay, setMenuPay] = useState([]);

  //Add&Edit Menu
  const handleAddMenu = (e) => {
    e.preventDefault();
    if (menuName != "") {
      const index = orderList.length + 1;
      setMenuID(index);
      setPrice(0);
      setMenuPay([]);
      orderList.push({
        id: index,
        name: menuName,
        price: menuPrice,
        cost: 0,
        pay: menuPay,
      });
      setOrderlist(orderList);
      openOrder();
    }
  };
  const handleEditMenu = (item) => {
    setMenuID(item.id);
    setName(item.name);
    setPrice(item.price);
    setMenuPay(item.pay);
    openOrder();
  };

  //Order open
  const openOrder = () => {
    setShowAddOrder(true);
  };
  const closeOrder = () => {
    setMenuID();
    setName("");
    setPrice(0);
    setMenuPay([]);
    setShowAddOrder(false);
  };

  //Remove order
  const handleCearOrderList = (e) => {
    e.preventDefault();
    setOrderlist([]);
  };

  const partyUpdate = () => {};

  //Tap
  const handleMembergroupClick = () => {
    setMenuTap(false);
    console.log(`Tap member`);
  };
  const handleMenulistClick = () => {
    setMenuTap(true);
    console.log(`Tap menu`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  const token = localStorage.getItem("access_token");
  if (!token) {
    return <LoginPage />;
  }

  return (
    <div className="hero min-h-screen bg-Green">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-2xl font-bold card-body text-Stone">
            Party Group
          </h1>
        </div>

        <h2 className="text-xl font-bold text-Stone">{partyName}</h2>
        {partyType === "Food&Drink" ? (
          <h2 className="text-md text-Stone">Restaurant: {partyMenu}</h2>
        ) : partyType === "Home&Hotel" ? (
          <h2 className="text-md text-Stone">Home&Hotel</h2>
        ) : (
          <h2 className="text-md text-Stone">Subscribe&Service</h2>
        )}

        <div className="card flex-shrink-0 w-full max-w-lg shadow-2xl bg-Emerald">
          <div className="card-body">
            <div className="form-control">
              <label className="label bg-Emerald2">
                <span
                  className="label-text w-1/2 text-center text-white border hover:bg-Green"
                  onClick={handleMenulistClick}
                >
                  Party
                </span>
                <span
                  className="label-text w-1/2 text-center text-white border hover:bg-Green"
                  onClick={handleMembergroupClick}
                >
                  Member List
                </span>
              </label>
            </div>

            {menuTap ? (
              <div className="bg-Emerald2">
                <label className=" label grid grid-cols-3 gap-2">
                  <span className="label-text text-white text-left">
                    Order name
                  </span>
                  <span className="label-text text-white text-right">
                    Price
                  </span>
                  <span className="label-text text-white text-right">Cost</span>
                  {orderList.map((item) => (
                    <div
                      key={item.id}
                      className="grid grid-cols-3 col-span-3 gap-2"
                      onClick={() => handleEditMenu(item)}
                    >
                      <span className="text-white text-left border">
                        {item.name}
                      </span>
                      <span className="text-white text-right border">
                        {item.price}
                      </span>
                      <span className="text-white text-right border">
                        {item.cost}
                      </span>
                    </div>
                  ))}
                </label>
                <div className="bg-Emerald2">
                  <form onSubmit={handleAddMenu}>
                    <div className="form-control">
                      <div className="grid grid-cols-4 gap-2">
                        <div className="col-span-3 bg-Emerald2">
                          <input
                            type="text"
                            placeholder="menu name..."
                            value={menuName}
                            onChange={(e) => setName(e.target.value)}
                            list="data"
                            autoCapitalize="off"
                          />
                          <datalist id="data">
                            {data.map((item) => (
                              <option key={item} value={item} />
                            ))}
                          </datalist>
                        </div>
                        <button className="rounded-md text-center text-white bg-Green hover:bg-Emerald2">
                          Add
                        </button>
                      </div>
                    </div>
                  </form>
                  <span
                    className="text-white w-fit cursor-pointer hover:bg-Green"
                    onClick={handleCearOrderList}
                  >
                    Clear list
                  </span>
                </div>
              </div>
            ) : (
              <div className="bg-Emerald2">
                <div className="bg-white flex justify-center ">
                  <QRCode value={partyCode} />
                </div>
                <label className=" label grid grid-cols-3 gap-2">
                  <span className="label-text text-white text-left">
                    Member name
                  </span>
                  <span className="label-text text-white text-right col-span-2">
                    Cost
                  </span>
                  {memberlist.map((item) => (
                    <div
                      key={item.id}
                      className="grid grid-cols-2 col-span-3 gap-2"
                    >
                      <span className="text-white text-left border">
                        {item.name}
                      </span>
                      <span className="text-white text-right border">
                        {item.cost}
                      </span>
                    </div>
                  ))}
                </label>
              </div>
            )}

            {showAddOrder && (
              <AddOrder
                id={menuID}
                name={menuName}
                price={menuPrice}
                memberpay={menuPay}
                memberlist={memberlist}
                close={closeOrder}
                orderlist={orderList}
                setOrderlist={setOrderlist}
              />
            )}

            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary">
                <Link
                  to="/"
                  className="label-text-alt link link-hover text-Stone"
                >
                  Next
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
