import React, { useState, useEffect } from "react";
import api from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import { LoginPage } from "./LoginPage";
import "../App.css";
import AddOrder from "../components/addOrderlist";
import QRCode from "react-qr-code";

export const PartyPage = () => {
  const navigate = useNavigate();
  const [partyID, setPertyID] = useState();
  const [partyName, setPartyName] = useState("");
  const [partyType, setPartyType] = useState("");
  const [partyHost, setPartyHost] = useState();
  const [partyMenu, setPartyMenu] = useState();
  const partyCode = localStorage.getItem("code");

  const [resName, setResName] = useState("");
  const [memberlist, setMemberlist] = useState([]);
  const [orderList, setOrderlist] = useState([]);
  const [menulist, setMenuList] = useState([]);
  const [menuTap, setMenuTap] = useState(true);

  useEffect(() => {
    const fetchPartyDetail = async () => {
      try {
        //Set party detail
        const data = await api.getParty(partyCode);
        setPertyID(data.id);
        setPartyName(data.partyName);
        setPartyType(data.type);
        setPartyHost(data.host);
        if (data.type === "F") {
          setPartyMenu(data.menu);
        }
        if (data.orderList) {
          setOrderlist(data.orderList);
        }

        //Set menu list
        if (data.type === "F") {
          const menu = await api.getMenuList(data.menu);
          setMenuList(menu);
          const restaurant = await api.getRestaurant(data.menu);
          setResName(restaurant.name);
        }

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
    if (partyType === "F") {
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
        cost: memberCosts[member.userID.first_name] || 0,
      }));

      setMemberlist(updatedMemberlist);
    }
    setMenuID();
    setMenuName("");
    setPrice(0);
    setMenuPay([]);
    setShowAddOrder(false);
  };

  const removeOrder = (itemId) => {
    const updatedOrderList = [...orderList];

    const indexToRemove = updatedOrderList.findIndex(
      (item) => item.id === itemId
    );

    if (indexToRemove !== -1) {
      updatedOrderList.splice(indexToRemove, 1);

      setOrderlist(updatedOrderList);
    }
  };
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

  const copyCode = () => {
    navigator.clipboard.writeText(partyCode);
    alert(`Code ${partyCode} copied to clipboard`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.updateParty(
        partyID,
        partyName,
        partyType,
        orderList,
        partyMenu
      );
      console.log("Update party success:", response);
    } catch (error) {
      console.error("Error updating party:", error);
    }

    for (const member of memberlist) {
      try {
        await api.updateMember(member.id, member.cost, member.slipImage);
        console.log("Update member list success for:", member.id);
      } catch (error) {
        console.error(`Error updating member for ${member.id}:`, error);
      }
    }

    console.log(orderList);
    console.log(memberlist);
    navigate("/summarizeBill");
  };

  window.onbeforeunload = function (event) {
    event.preventDefault();
    event.returnValue = "";
  };

  const token = localStorage.getItem("access_token");
  if (!token) {
    return <LoginPage />;
  }

  if (!partyCode || partyCode === null) {
    navigate("/networkError");
  }

  return (
    <div className="container flex justify-center place-items-center min-h-screen bg-Green">
      <div className="w-2/3 flex flex-col place-items-center">
        <h2 className="text-5xl font-bold text-Stone mb-2">{partyName}</h2>
        {partyType === "F" ? (
          <h2 className="text-lg text-Stone">Restaurant: {resName}</h2>
        ) : partyType === "H" ? (
          <h2 className="text-lg text-Stone">Home&Rental</h2>
        ) : (
          <h2 className="text-lg text-Stone">Subscription&Service</h2>
        )}

        <div className="card flex-shrink-0 w-full max-w-lg shadow-2xl bg-Emerald mt-16">
          <div className="card-body">
            <div className="form-control">
              <label className="tabs tabs-boxed label bg-Emerald2 rounded-lg">
                <span
                  className={`label-text w-1/2 text-center text-white rounded-l-md tab ${
                    menuTap ? "tab-active" : ""
                  }`}
                  onClick={handleMenulistClick}
                >
                  Order List
                </span>
                <span
                  className={`label-text w-1/2 text-center text-white rounded-r-md tab ${
                    !menuTap ? "tab-active" : ""
                  }`}
                  onClick={handleMembergroupClick}
                >
                  Member
                </span>
              </label>
            </div>

            {menuTap ? (
              <div className="bg-Emerald2 rounded-lg">
                <label className=" label grid grid-cols-5 gap-2">
                  <span className="label-text text-white text-left col-span-3">
                    List{" "}
                  </span>
                  <span className="label-text text-white text-center">
                    Price{" "}
                  </span>
                  <span className="label-text text-white text-right">
                    Cost/Person
                  </span>
                  {orderList.map((item) => (
                    <div
                      key={item.index}
                      className="grid grid-cols-5 col-span-5 gap-2 bg-neutral"
                    >
                      <div
                        className="col-span-5 grid grid-cols-5 cursor-pointer"
                        onClick={() => handleEditMenu(item)}
                      >
                        <div className="text-white text-left bg-neutral-focus col-span-3">
                          {item.name}
                        </div>
                        <div className="text-white text-center ">
                          {item.price}
                        </div>
                        <div className="text-white text-center bg-neutral-focus">
                          {item.cost}
                        </div>
                      </div>
                      <div className="col-span-5 border-t pt-2 pb-1">
                        {item.pay.length !== 0 ? (
                          item.pay.map((member) => (
                            <div className="avatar placeholder mx-1" key={member}>
                              <div className="bg-neutral-focus text-neutral-content rounded-full w-8">
                                <span className="text-xs">
                                  {member ? member.charAt(0) : ""}
                                </span>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="avatar placeholder">
                            <div className="bg-neutral-focus text-neutral-content rounded-full w-8">
                              <span className="text-xs">None</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </label>
                <div className="bg-Emerald2 my-5 rounded-b-lg">
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
                          {partyType === "F" ? (
                            <datalist id="list">
                              {menulist.map((item) => (
                                <option key={item.id} value={item.name} />
                              ))}
                            </datalist>
                          ) : partyType === "H" ? (
                            <datalist id="list">
                              <option value="Rent" />
                              <option value="Electricity" />
                              <option value="Water" />
                              <option value="Internet" />
                              <option value="Other" />
                            </datalist>
                          ) : partyType === "S" ? (
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

                  <button
                    className="btn btn-error btn-sm mt-4 text-white hover:btn-outline"
                    onClick={handleClearOrderList}
                  >
                    Clear
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-Emerald2 rounded-lg">
                <div className="bg-white flex justify-center rounded-t-lg">
                  <QRCode className="my-5" value={partyCode} />
                </div>
                <div className="bg-Green my-4 mx-auto rounded-md w-1/2">
                  <h3
                    className="w-full text-center select-none cursor-pointer text-Stone"
                    onClick={copyCode}
                  >
                    Code: {partyCode}
                  </h3>
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
                      <span className="text-white text-left bg-neutral-focus rounded-l-md pl-2">
                        {item.userID.first_name}
                      </span>
                      <span className="text-white text-right bg-neutral-focus rounded-r-md pr-2">
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
                removeOrder={removeOrder}
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
