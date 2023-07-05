import axios from "axios";

const API_URL = "http://localhost:8000"; // Replace with your Django backend URL

//Login
const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/users/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    this.setState({ message: error.response.data.message });
  }
};

//Logout
const logout = async () => {
  try {
    const response = await axios.post(`${API_URL}/users/logout`);
    // localStorage.removeItem("email");
    // localStorage.removeItem("userToken");
    // localStorage.removeItem("first_name");
    // localStorage.removeItem("phone");
    // localStorage.removeItem('is_superuser')
    Store.currentUser = null;
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

//Register
const register = async (first_name, email, password, phone) => {
  try {
    const response = await axios.post(`${API_URL}/users/register`, {
      first_name,
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

const partyset = async (patyName, type, menu, host) => {
  try {
    const response = await axios.post(`${API_URL}/parties/partyset`, {
      patyName,
      type,
      menu,
      host,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const memberset = async (first_name, cost) => {
  try {
    const response = await axios.post(`${API_URL}/parties/memberset`, {
      first_name,
      cost,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const restaurantset = async (name) => {
  try {
    const response = await axios.post(`${API_URL}/menus/restaurantset`, {
      name,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const menuset = async (name, email, password, phone) => {
  try {
    const response = await axios.post(`${API_URL}/menus/menuset`, {
      name,
      restaurant,
      price,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export default {
  login,
  logout,
  register,
  resetpass,
  partyset,
  memberset,
  menuset,
  restaurantset,
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
