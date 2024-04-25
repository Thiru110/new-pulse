import api from "./axiosConfig";

export const forgotUser = async (data) => {
  try {
    const response = await api.post("/user/forgot", data);
    console.log(response);
    if (response.data.Status === "success") {
      SetLocalStorageToken(response.data?.Response?.token);
    }
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};

export const loginUser = async (data) => {
  try {
    const response = await api.post("/user/login", data);
    console.log(response.data);
    if (response.data.Status === "Success") {
      SetLocalStorageToken(response.data?.Response?.Token);
    }
    // window.alert(response);
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};
export const SetLocalStorageToken = (token) => {
  token && localStorage.setItem("Token", token);
};

export const ResetPassword = async (data) => {
  try {
    console.log(data);
    const response = await api.put("user/reset", data);
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};

export const CheckToken = async () => {
  const response = await api.get("/user/auth");
  return response.data;
};
