import axios from "axios";

const API_URL = "http://localhost:3000/api/auth/";
const API_USER = "http://localhost:3000/api/";

const register = (username, password) => {
  return axios.post(API_URL + "signup", {
    username,
    password,
  });
};

const deleteuser = (id, username, password) => {
  return axios.patch(API_USER + "deleteuser/" + id, {
    username,
    password,
  })
  .then(() => {
    localStorage.removeItem("user");
  });
};

const changePassword = (id, oldusername, oldpassword, newusername, newpassword ) => {
  return axios.patch(API_USER + "updateuser/" + id, {
    oldusername,
    oldpassword,
    newusername,
    newpassword 
  });
};

const changeUsername = (id, oldusername, oldpassword, newusername, newpassword) => {
  return axios.patch(API_USER + "updateuser/" + id, {
    oldusername,
    oldpassword,
    newusername,
    newpassword 
  });
};

const login = (username, password) => {
  return axios
    .post(API_URL + "signin", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.username) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
  return axios.post(API_URL + "signout").then((response) => {
    return response.data;
  });
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};



const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
  changePassword,
  changeUsername,
  deleteuser
};

export default AuthService;
