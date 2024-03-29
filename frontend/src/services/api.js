import axios from "axios";

const API_URL = "http://localhost:8000"; // Replace with your Django backend URL

//Login
const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/api/token/`, {
      email,
      password,
    });

    localStorage.setItem("access_token", response.data.access);
    localStorage.setItem("refresh_token", response.data.refresh);
    setUser();
    return response;
  } catch (error) {
    this.setState({ message: error.response.data.message });
  }
};

//Set User Data
const setUser = async () => {
  const access_token = localStorage.getItem("access_token");
  try {
    const response = await axios.get(`${API_URL}/users/getuser`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    // store user data in local storage
    localStorage.setItem("userID", response.data.userID);
    localStorage.setItem("first_name", response.data.first_name);
    localStorage.setItem("last_name", response.data.last_name);
    localStorage.setItem("email", response.data.email);
    localStorage.setItem("phone", response.data.phone);
    localStorage.setItem("is_staff", response.data.is_staff);
  } catch (error) {
    if (error.response.status === 401 && access_token) {
      // Access Token หมดอายุหรือไม่ถูกต้อง
      await refreshToken();
      return setUser();
    } else {
      console.error(error);
    }
  }
};

//Refresh Token
const refreshToken = async () => {
  const refresh_token = localStorage.getItem("refresh_token");
  if (refresh_token) {
    try {
      const response = await axios.post(`${API_URL}/api/token/refresh/`, {
        refresh: refresh_token,
      });
      localStorage.setItem("access_token", response.data.access);
    } catch (refreshError) {
      console.error(refreshError);
      localStorage.clear();
      window.location.reload();
    }
  } else {
    localStorage.clear();
    window.location.reload();
  }
};

//Logout
const logout = async () => {
  const access_token = localStorage.getItem("access_token");
  try {
    const response = await axios.post(`${API_URL}/users/logout`, null, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    localStorage.clear();
    return response.data;
  } catch (error) {
    if (error.response.status === 401 && access_token) {
      await refreshToken();
      return logout();
    } else {
      console.error(error);
    }
  }
};

//Register
const register = async (first_name, last_name, email, password, phone) => {
  try {
    const response = await axios.post(`${API_URL}/users/register`, {
      first_name,
      last_name,
      email,
      password,
      phone,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

//Reset password
const resetpass = async (email, new_password) => {
  try {
    const response = await axios.post(`${API_URL}/users/resetpass`, {
      email,
      new_password,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Create new party
const createParty = async (partyName, type, menu, hostID, promptPay) => {
  const access_token = localStorage.getItem("access_token");
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let Code = "";
  let orderList = [];
  for (let i = 0; i < 5; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    Code += characters[randomIndex];
  }
  try {
    const response = await axios.post(
      `${API_URL}/api/partyset/`,
      {
        partyName,
        type,
        menu,
        hostID,
        Code,
        orderList,
        promptPay,
      },
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    console.log("Party Name:", partyName);
    console.log("Bill Type:", type);
    console.log("Menu:", menu);
    console.log("host:", hostID);
    console.log("code:", Code);
    localStorage.setItem("code", Code);
    return response.data;
  } catch (error) {
    if (error.response.status === 401 && access_token) {
      await refreshToken();
      return createParty();
    } else {
      console.error(error);
    }
  }
};

const updateParty = async (
  partyID,
  partyName,
  type,
  orderList,
  menu,
  promptPay
) => {
  const access_token = localStorage.getItem("access_token");
  try {
    const response = await axios.put(
      `${API_URL}/api/partyset/${partyID}/`,
      {
        partyName,
        type,
        menu,
        orderList,
        promptPay,
      },
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    if (error.response.status === 401 && access_token) {
      await refreshToken();
      return updateParty(partyID, partyName, type, orderList, menu, promptPay);
    } else {
      console.error(error);
    }
  }
};

//Join Party
const memberset = async (userID, cost, party) => {
  const access_token = localStorage.getItem("access_token");
  try {
    const response = await axios.post(
      `${API_URL}/api/memberset/`,
      {
        party,
        userID,
        cost,
      },
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response.status === 401 && access_token) {
      await refreshToken();
      return memberset(userID, cost, party);
    } else {
      console.error(error);
    }
  }
};

const updateMember = async (memberID, cost, slipImage) => {
  const access_token = localStorage.getItem("access_token");
  try {
    const response = await axios.put(
      `${API_URL}/api/memberset/${memberID}/`,
      {
        cost,
        slipImage,
      },
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response.status === 401 && access_token) {
      await refreshToken();
      return updateMember(memberID, cost, slipImage);
    } else {
      console.error(error);
    }
  }
};

const uploadImage = async (memberID, slipImage) => {
  const access_token = localStorage.getItem("access_token");
  try {
    const formData = new FormData();
    formData.append("slipImage", slipImage);

    const response = await axios.patch(
      `${API_URL}/api/memberset/${memberID}/upload_slip/`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response.status === 401 && access_token) {
      await refreshToken();
      return uploadImage();
    } else {
      console.error(error);
    }
  }
};

// Get party by code
export const getParty = async (partyCode) => {
  const access_token = localStorage.getItem("access_token");
  try {
    const response = await axios.get(`${API_URL}/parties/party/${partyCode}/`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response.status === 401 && access_token) {
      try {
        await refreshToken();
        return getParty(partyCode);
      } catch (refreshError) {
        console.error(refreshError);
      }
    } else {
      console.error(error);
    }
  }
};

const addRestaurant = async (name) => {
  const access_token = localStorage.getItem("access_token");
  try {
    const response = await axios.post(
      `${API_URL}/api/restaurants/`,
      {
        name,
      },
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response.status === 401 && access_token) {
      await refreshToken();
      return addRestaurant(name);
    } else {
      console.error(error);
    }
  }
};

const addMenu = async (restaurant, name, price) => {
  const access_token = localStorage.getItem("access_token");
  try {
    const response = await axios.post(
      `${API_URL}/api/menuitems/`,
      {
        restaurant,
        name,
        price,
      },
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response.status === 401 && access_token) {
      await refreshToken();
      return addMenu();
    } else {
      console.error(error);
    }
  }
};

export const getRestaurantsList = async () => {
  const access_token = localStorage.getItem("access_token");
  try {
    const response = await axios.get(`${API_URL}/api/restaurants/`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response.status === 401 && access_token) {
      await refreshToken();
      return getRestaurantsList();
    } else {
      console.error(error);
    }
  }
};

export const getRestaurant = async (id) => {
  const access_token = localStorage.getItem("access_token");
  try {
    const response = await axios.get(`${API_URL}/api/restaurants/${id}/`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response.status === 401 && access_token) {
      await refreshToken();
      return getRestaurant(id);
    } else {
      console.error(error);
    }
  }
};

export const setRestaurant = async (id, name) => {
  const access_token = localStorage.getItem("access_token");
  try {
    const response = await axios.put(
      `${API_URL}/api/restaurants/${id}/`,
      {
        name,
      },
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    return response;
  } catch (error) {
    if (error.response.status === 401 && access_token) {
      await refreshToken();
      return setRestaurant(id, name);
    } else {
      console.error(error);
      throw error;
    }
  }
};

export const deleteRestaurant = async (id) => {
  const access_token = localStorage.getItem("access_token");
  try {
    const response = await axios.delete(`${API_URL}/api/restaurants/${id}/`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    return response;
  } catch (error) {
    if (error.response.status === 401 && access_token) {
      await refreshToken();
      return deleteRestaurant(id);
    } else {
      console.error(error);
      throw error;
    }
  }
};

export const getMenuList = async (restaurantID) => {
  const access_token = localStorage.getItem("access_token");
  try {
    const response = await axios.get(
      `${API_URL}/menus/menuitems/${restaurantID}/`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response.status === 401 && access_token) {
      await refreshToken();
      return getMenuList(restaurantID);
    } else {
      console.error(error);
    }
  }
};

export const setMenu = async (id, name, price, restaurant) => {
  const access_token = localStorage.getItem("access_token");
  try {
    const response = await axios.put(
      `${API_URL}/api/menuitems/${id}/`,
      {
        name,
        price,
        restaurant,
      },
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    return response;
  } catch (error) {
    if (error.response.status === 401 && access_token) {
      await refreshToken();
      return setMenu(id, name, price, restaurant);
    } else {
      console.error(error);
      throw error;
    }
  }
};

export const deleteMenu = async (id) => {
  const access_token = localStorage.getItem("access_token");
  try {
    const response = await axios.delete(`${API_URL}/api/menuitems/${id}/`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    return response;
  } catch (error) {
    if (error.response.status === 401 && access_token) {
      await refreshToken();
      return deleteMenu(id);
    } else {
      console.error(error);
      throw error;
    }
  }
};

export const getMemberList = async (partyID) => {
  const access_token = localStorage.getItem("access_token");
  try {
    const response = await axios.get(
      `${API_URL}/parties/memberlist/${partyID}/`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response.status === 401 && access_token) {
      await refreshToken();
      return getMemberList(partyID);
    } else {
      console.error(error);
    }
  }
};

export const getHistory = async () => {
  const access_token = localStorage.getItem("access_token");
  const userID = localStorage.getItem("userID");
  try {
    const response = await axios.get(
      `${API_URL}/parties/history/${userID}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response.status === 401 && access_token) {
      await refreshToken();
      return getHistory();
    } else {
      console.error(error);
    }
  }
}

export default {
  login,
  logout,
  register,
  resetpass,
  createParty,
  updateParty,
  memberset,
  updateMember,
  uploadImage,
  addMenu,
  setMenu,
  deleteMenu,
  addRestaurant,
  setRestaurant,
  deleteRestaurant,
  getRestaurantsList,
  getRestaurant,
  getParty,
  getMenuList,
  getMemberList,
  getHistory,
};
