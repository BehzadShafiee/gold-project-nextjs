import axios from "axios";

// const customerApiUrl = "http://localhost:3001/user/api";

const customerApiUrl = "http://192.168.41.42:3001/user/api";

export const checkUserAuthBySession = async (sessionId) => {
  try {
    const data = await fetch(`${customerApiUrl}/user/check-auth/${sessionId}` , { cache: 'no-store' });
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
  await axios({
    url: `${customerApiUrl}/user/sign-in`,
    withCredentials: true,
    method: "post",
    data: userData
  })
    .then((res) => {
      // return res;
      window.location.href = '/user/home';
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

export const logInUserByAxios = async (userData) => {
  await axios({
    url: `${customerApiUrl}/user/log-in`,
    withCredentials: true,
    method: "post",
    data: userData
  })
    .then((res) => {
      // return res;
      window.location.href = '/user/home';
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

export const logOutUserByAxios = async (userId) => {
  await axios({
    url: `${customerApiUrl}/user/log-out`,
    withCredentials: true,
    method: "post",
    data: { "userId" : userId }
  })
    .then((res) => {
      // console.log(res)
      window.location.href = '/user/log-in';
    })
    .catch((err) => console.log(err));
};

export const submitSellOrderByAxios = async (sellData) => {
  await axios({
    url: `${customerApiUrl}/sell`,
    method: "post",
    data: sellData
  })
    .then((res) => {console.log(res)})
    .catch((err) => console.log(err));
};

export const submitBuyOrderByAxios = async (buyData) => {
  await axios({
    url: `${customerApiUrl}/buy`,
    method: "post",
    data: buyData,
  })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      // console.log(err);
      return err;
    });
};
