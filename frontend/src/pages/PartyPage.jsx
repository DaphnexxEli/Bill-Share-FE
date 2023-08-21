import React, { useState, useEffect } from "react";
import api from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import { LoginPage } from "./LoginPage";
import "../App.css";
import AddOrder from "../components/addOrderlist";
import QRCode from "react-qr-code";

export const PartyPage = () => {
  const navigate = useNavigate();
  const [partyName, setPartyName] = useState("");
  const [partyType, setPartyType] = useState("");
  const [partyHost, setPartyHost] = useState("");
  const [partyMenu, setPartyMenu] = useState("");
  const partyCode = localStorage.getItem("code");

  const [memberlist, setMemberlist] = useState([]);
  const [orderList, setOrderlist] = useState([]);
  const [menulist, setMenuList] = useState([]);
  const [menuTap, setMenuTap] = useState(true);

  useEffect(() => {
    const fetchPartyDetail = async () => {
      try {
        //Set party detail
        const data = await api.getParty(partyCode);
        setPartyName(data.partyName);
        setPartyType(data.type);
        setPartyHost(data.host);
        if (data.type === "Food&Drink") {
          setPartyMenu(data.menu);
        }
        setOrderlist(data.orderList);

        //Set menu list
        const menu = await api.getMenuList(data.menu);
        setMenuList(menu);

        //Set member list
        const member = await api.getMemberList(data.id);
        setMemberlist(member);
      } catch (error) {
        console.error(error);
      }
    };

    if (partyCode) {
      fetchPartyDetail();
    }
  }, []);

  // menu order
  const [showAddOrder, setShowAddOrder] = useState(false);
  const [menuID, setMenuID] = useState();
  const [menuName, setMenuName] = useState("");
  const [menuPrice, setPrice] = useState(0);
  const [menuPay, setMenuPay] = useState([]);

  //Add&Edit Menu
  const handleAddMenu = (e) => {
    e.preventDefault();
    if (partyType === "Food&Drink") {
      if (menuName != "") {
        const menuItem = menulist?.find((item) => item.name === menuName);
        const index = orderList.length + 1;
        setMenuID(index);

        if (menuItem) {
          setPrice(menuItem.price || 0);
        } else {
          setPrice(0);
        }

        setMenuPay([]);

        orderList.push({
          id: index,
          name: menuName,
          price: menuItem ? menuItem.price : 0,
          cost: 0,
          pay: menuPay,
        });

        setOrderlist(orderList);
        openOrder();
      }
    } else {
      const index = orderList.length + 1;
      setMenuID(index);
      setPrice(0);
      setMenuPay([]);
      orderList.push({
        id: index,
        name: menuName,
        price: 0,
        cost: 0,
        pay: menuPay,
      });
      setOrderlist(orderList);
      openOrder();
    }
  };
  const handleEditMenu = (selectedMenu) => {
    setMenuID(selectedMenu.id);
    setMenuName(selectedMenu.name);
    setPrice(selectedMenu.price);
    setMenuPay(selectedMenu.pay);
    openOrder();
  };

  //Order open
  const openOrder = () => {
    setShowAddOrder(true);
  };
  const closeOrder = () => {
    if (orderList.length > 0) {
      const memberCosts = [];

      orderList.forEach((order) => {
        const { pay, cost } = order;

        pay.forEach((payer) => {
          memberCosts[payer] = (memberCosts[payer] || 0) + cost;
        });
      });

      const updatedMemberlist = memberlist.map((member) => ({
        ...member,
        cost: memberCosts[member.name] || 0,
      }));

      setMemberlist(updatedMemberlist);
      console.log(updatedMemberlist);
    }
    setMenuID();
    setMenuName("");
    setPrice(0);
    setMenuPay([]);
    setShowAddOrder(false);
  };

  //Remove order
  const handleClearOrderList = (e) => {
    e.preventDefault();
    setOrderlist([]);
  };

  //Tap
  const handleMembergroupClick = () => {
    setMenuTap(false);
    //console.log(`Tap member`);
  };
  const handleMenulistClick = () => {
    setMenuTap(true);
    //console.log(`Tap menu`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(orderList);
    console.log(memberlist);
    navigate("/");
  };

  window.onbeforeunload = function (event) {
    event.preventDefault();
    event.returnValue = "";
  };

  const token = localStorage.getItem("access_token");
  if (!token) {
    return <LoginPage />;
  }

  return (
    <div className="hero min-h-screen bg-base">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
        </div>

        <h2 className="text-xl font-bold text-Stone">{partyName}</h2>
        {partyType === "Food&Drink" ? (
          <h2 className="text-md text-Stone">Restaurant: {partyMenu}</h2>
        ) : partyType === "Home&Hotel" ? (
          <h2 className="text-md text-Stone">Home&Rental</h2>
        ) : (
          <h2 className="text-md text-Stone">Subscribtion&Service</h2>
        )}

        <div className="card flex-shrink-0 w-full max-w-lg shadow-2xl bg-Emerald">
          <div className="card-body">
            <div className="form-control">
              <label className="label bg-Emerald2">
                <span
                  className="label-text w-1/2 text-center text-white border hover:bg-Green"
                  onClick={handleMenulistClick}
                >
                  Ongoing
                </span>
                <span
                  className="label-text w-1/2 text-center text-white border hover:bg-Green"
                  onClick={handleMembergroupClick}
                >
                  Member 
                </span>
              </label>
            </div>

            {menuTap ? (
              <div className="bg-Emerald2">
                <label className=" label grid grid-cols-3 gap-2">
                  <span className="label-text text-white text-left">
                    List {" "}
                  </span>
                  <span className="label-text text-white text-right">
                    Price{" "}
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
                            onChange={(e) => setMenuName(e.target.value)}
                            list="list"
                            autoCapitalize="off"
                          />
                          {partyType === "Food&Drink" ? (
                            <datalist id="list">
                              {menulist.map((item) => (
                                <option key={item.id} value={item.name} />
                              ))}
                            </datalist>
                          ) : partyType === "Home&Hotel" ? (
                            <datalist id="list">
                              <option value="Rent" />
                              <option value="Electricity" />
                              <option value="Water" />
                              <option value="Internet" />
                              <option value="Other" />
                            </datalist>
                          ) : partyType === "Subscribe&Service" ? (
                            <datalist id="list">
                              <option value="Youtube Premium " />
                              <option value="Netflix" />
                              <option value="HBO" />
                              <option value="Disney+" />
                              <option value="Amazon Prime Video" />
                              <option value="Spotify" />
                              <option value="Apple Music" />
                            </datalist>
                          ) : (
                            <datalist id="list">
                              <option value="" />
                            </datalist>
                          )}
                        </div>
                        <button className="rounded-md text-center text-Stone bg-Amber ">
                          Add
                        </button>
                      </div>
                    </div>
                  </form>
                  <span
                    className="text-white w-fit cursor-pointer hover:bg-Green"
                    onClick={handleClearOrderList}
                  >
                    Clear 
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
              <button type="submit" className="btn btn-primary bg-Emerald2">
                <Link
                  to="/"
                  onClick={handleSubmit}
                  className="label-text-alt link link-hover text-white"
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
