import axios from "axios";

const API_URL = "http://localhost:8000"; // Replace with your Django backend URL

//Login
const login = async(email, password) => {
    try {
        const response = await axios.post(`${API_URL}/api/token/`, {
            email,
            password,
        });

        setUser(response.data.access);
        return response.data;
    } catch (error) {
        this.setState({ message: error.response.data.message });
    }
};

//Set User Data
const setUser = async(access_token) => {
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
        this.setState({ message: error.response.data.message });
    }
};

//Logout
const logout = async(access_token) => {
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
        console.error(error);
    }
};

//Register
const register = async(first_name, last_name, email, password, phone) => {
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

const resetpass = async(email, new_password, confirm_password) => {
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

const createParty = async(partyName, type, menu, host) => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";
    for (let i = 0; i < 5; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        code += characters[randomIndex];
    }
    try {
        console.log("Party Name:", partyName);
        console.log("Bill Type:", type);
        console.log("Menu:", menu);
        console.log("host:", host);
        console.log("code:", code);
        const response = await axios.post(`${API_URL}/api/partyset/`, {
            partyName,
            type,
            menu,
            host,
            code,
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

const memberset = async(first_name, cost) => {
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

const restaurantset = async(name) => {
    try {
        const response = await axios.post(`${API_URL}/menus/restaurantset`, {
            name,
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

const menuset = async(name, email, password, phone) => {
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

export const getRestaurantsList = async() => {
    const access_token = localStorage.getItem('access_token');
    try {
        const response = await axios.get(`${API_URL}/api/restaurants/`, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
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