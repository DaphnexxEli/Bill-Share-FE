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
    localStorage.setItem("first_name", response.data.first_name);
    localStorage.setItem("last_name", response.data.last_name);
    localStorage.setItem("email", response.data.email);
    localStorage.setItem("phone", response.data.phone);
    localStorage.setItem("is_staff", response.data.is_staff);
  } catch (error) {
    if (error.response.status === 401) {
      // Access Token หมดอายุหรือไม่ถูกต้อง
      refreshToken();
      const response = await axios.get(`${API_URL}/users/getuser`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      localStorage.setItem("first_name", response.data.first_name);
      localStorage.setItem("last_name", response.data.last_name);
      localStorage.setItem("email", response.data.email);
      localStorage.setItem("phone", response.data.phone);
      localStorage.setItem("is_staff", response.data.is_staff);
    } else {
      console.error(error);
    }
  }
};

//Refresh Token
const refreshToken = async () => {
  const refresh_token = localStorage.getItem("refresh_token");
  try {
    const response = await axios.post(`${API_URL}api/token/refresh/`, {
      refresh: refresh_token,
    });
    localStorage.setItem("access_token", response.access);
  } catch (refreshError) {
    console.error(refreshError);
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("email");
    localStorage.removeItem("first_name");
    localStorage.removeItem("last_name");
    localStorage.removeItem("phone");
    localStorage.removeItem("is_staff");
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
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("email");
    localStorage.removeItem("first_name");
    localStorage.removeItem("last_name");
    localStorage.removeItem("phone");
    localStorage.removeItem("is_staff");
    return response.data;
  } catch (error) {
    if (error.response.status === 401) {
      refreshToken();
      const response = await axios.post(`${API_URL}/users/logout`, null, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("email");
      localStorage.removeItem("first_name");
      localStorage.removeItem("last_name");
      localStorage.removeItem("phone");
      localStorage.removeItem("is_staff");
      return response.data;
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

const resetpass = async (email, new_password, confirm_password) => {
  try {
    const response = await axios.post(`${API_URL}/users/resetpass`, {
      email,
      new_password,
      confirm_password,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const createParty = async (partyName, type, menu, host) => {
  const access_token = localStorage.getItem("access_token");
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let Code = "";
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
        host,
        Code,
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
    console.log("host:", host);
    console.log("code:", Code);
    localStorage.setItem("code", Code);
    return response.data;
  } catch (error) {
    if (error.response.status === 401) {
      refreshToken();

      const response = await axios.post(
        `${API_URL}/api/partyset/`,
        {
          partyName,
          type,
          menu,
          host,
          Code,
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
      console.log("host:", host);
      console.log("code:", Code);
      localStorage.setItem("code", Code);
      return response.data;
    } else {
      console.error(error);
    }
  }
};

const memberset = async (first_name, cost, code) => {
  const access_token = localStorage.getItem("access_token");
  if (code === "") {
    code = localStorage.getItem("code");
  }
  try {
    const response = await axios.post(
      `${API_URL}/api/memberset`,
      {
        first_name,
        cost,
        code,
      },
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response.status === 401) {
      refreshToken();

      const response = await axios.post(
        `${API_URL}/parties/memberset`,
        {
          first_name,
          cost,
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      return response.data;
    } else {
      console.error(error);
    }
  }
};

export const getParty = async () => {
  const access_token = localStorage.getItem("access_token");
  const partyCode = localStorage.getItem("code");
  try {
    const response = await axios.get(`${API_URL}/api/partyset/`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    const index = response.data.findIndex((item) => item.Code === partyCode);
    if (index !== -1) {
      return response.data[index];
    } else {
      console.log("Party Not exist!!");
    }
  } catch (error) {
    if (error.response.status === 401) {
      refreshToken();

      const response = await axios.get(`${API_URL}/api/partyset/`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      const index = response.data.findIndex((item) => item.Code === partyCode);
      if (index !== -1) {
        return response.data[index];
      } else {
        console.log("Party Not exist!!");
      }
    } else {
      console.error(error);
    }
  }
};

const restaurantset = async (name) => {
  const access_token = localStorage.getItem("access_token");
  try {
    const response = await axios.post(
      `${API_URL}/menus/restaurantset`,
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
    if (error.response.status === 401) {
      refreshToken();

      const response = await axios.post(
        `${API_URL}/menus/restaurantset`,
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
    } else {
      console.error(error);
    }
  }
};

const menuset = async (name, restaurant, price) => {
  try {
    const response = await axios.post(
      `${API_URL}/menus/menuset`,
      {
        name,
        restaurant,
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
    if (error.status === 401) {
      refreshToken();

      const response = await axios.post(
        `${API_URL}/menus/menuset`,
        {
          name,
          restaurant,
          price,
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      return response.data;
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
    if (error.status === 401) {
      refreshToken();

      const response = await axios.get(`${API_URL}/api/restaurants/`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      return response.data;
    } else {
      console.error(error);
    }
  }
};

export const getMenuList = async (resId) => {
  const access_token = localStorage.getItem("access_token");
  try {
    const response = await axios.get(`${API_URL}/api/restaurants/`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (error.status === 401) {
      refreshToken();

      const response = await axios.get(`${API_URL}/api/restaurants/`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      return response.data;
    } else {
      console.error(error);
    }
  }
};

export default {
  login,
  logout,
  register,
  resetpass,
  createParty,
  memberset,
  menuset,
  restaurantset,
  getRestaurantsList,
  getParty,
};

// import axios from 'axios';

// const apiClient = axios.create({
//   baseURL: "http://localhost:8000",
//   withCredentials: false,
//   headers: {
//     Accept: 'application/json',
//     'Content-Type': 'application/json'
//   }
// });

// export default apiClient;
