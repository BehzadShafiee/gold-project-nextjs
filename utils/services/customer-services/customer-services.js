import axios from "axios";

// const customerApiUrl = "http://localhost:3001/user/api";

const customerApiUrl = "http://192.168.41.42:3001/user/api";

export const checkUserAuthBySession = async (sessionId , userId) => {
  try {
    const data = await fetch(`${customerApiUrl}/user/check-auth/${sessionId}/${userId}` , { cache: 'no-store' });
    return data.json();    
  } catch (error) {
    console.log(error);
    return error;
  }
}

export const getAllWalletProductsByFetch = async (userId) => {
  try {
    const data = await fetch(`${customerApiUrl}/wallet/${userId}` , { cache: 'no-store' });
    return data.json();
  } catch (error) {
    console.log(error);
    return error;
  }
}

export const SignInUserByAxios = async (userData) => {
  try {
    const res = await axios({
      url: `${customerApiUrl}/user/sign-in`,
      withCredentials: true,
      method: "post",
      data: userData
    });
    return res.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const logInUserByAxios = async (userData) => {
  try {
    const res = await axios({
      url: `${customerApiUrl}/user/log-in`,
      withCredentials: true,
      method: "post",
      data: userData
    });
    return res.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const logOutUserByAxios = async (userId) => {
  try {
    const res = await axios({
    url: `${customerApiUrl}/user/log-out`,
    withCredentials: true,
    method: "put",
    data: { "userId" : userId }
  });
  return res.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const submitSellOrderByAxios = async (sellData) => {
  try {
    const res = await axios({
      url: `${customerApiUrl}/sell`,
      method: "post",
      data: sellData
    });
    return res.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const submitBuyOrderByAxios = async (buyData) => {
  try {
    const res = await axios({
      url: `${customerApiUrl}/buy`,
      method: "post",
      data: buyData,
    });
    return res.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};
