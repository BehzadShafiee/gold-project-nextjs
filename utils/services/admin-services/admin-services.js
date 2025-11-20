import axios from "axios";

// const adminApiUrl = "http://localhost:3001/admin/api";
// const customerApiUrl = "http://localhost:3001/user/api";

const adminApiUrl = "http://192.168.41.42:3001/admin/api";
const customerApiUrl = "http://192.168.41.42:3001/user/api";

export const checkAdminAuthBySession = async (sessionId) => {
  try {
    const data = await fetch(`${adminApiUrl}/admin/check-auth/${sessionId}` , { cache: 'no-store' });
    return data.json();    
  } catch (error) {
    console.log(error);
    return error;
  }
}

export const SignInAdminByAxios = async (adminData) => {
  await axios({
    url: `${adminApiUrl}/admin/sign-in`,
    withCredentials: true,
    method: "post",
    data: adminData
  })
    .then((res) => {
      // return res;
      window.location.href = '/admin/dashboard';
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

export const logInAdminByAxios = async (adminData) => {
  await axios({
    url: `${adminApiUrl}/admin/log-in`,
    withCredentials: true,
    method: "post",
    data: adminData
  })
    .then((res) => {
      // return res;
      window.location.href = '/admin/dashboard';
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

export const logOutAdminByAxios = async (adminId) => {
  await axios({
    url: `${customerApiUrl}/admin/log-out`,
    withCredentials: true,
    method: "put",
    data: { "adminId" : adminId }
  })
    .then((res) => {
      // console.log(res)
      window.location.href = '/admin/log-in';
    })
    .catch((err) => console.log(err));
};

export const getAllUsersByFetch = async () => {
  try {
    const data = await fetch(`${customerApiUrl}/user/users-list` , { cache: 'no-store' });
    return data.json();
  } catch (error) {
    console.log(error);
    return error;
  }
}

export const getUsersByUserId = async (userId) => {
  try {
    const data = await fetch(`${customerApiUrl}/user/${userId}` , { cache: 'no-store' });
    return data.json();
  } catch (error) {
    console.log(error);
    return error;
  }
}

export const getAllOrdersByFetch = async () => {
  try {
    const data = await fetch(`${adminApiUrl}/orders` , { cache: 'no-store' });
    return data.json();
  } catch (error) {
    console.log(error);
    return error;
  }
}

export const getOrdersByOrderId = async (orderId) => {
  try {
    const data = await fetch(`${adminApiUrl}/orders/${orderId}` , { cache: 'no-store' });
    return data.json();
  } catch (error) {
    console.log(error);
    return error;
  }
}

export const setNewRegisterationForOrderByOrderId = async (orderId , registerValue) => {
  await axios({
    url: `${adminApiUrl}/orders/register/${orderId}`,
    method: "post",
    data: registerValue,
  })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};

export const changeOrderRegisterationByOrderId = async (orderId , registerValue) => {
  await axios({
    url: `${adminApiUrl}/orders/register/${orderId}`,
    method: "put",
    data: registerValue,
  })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};

export const getAllProductsByFetch = async () => {
  try {
    const data = await fetch(`${adminApiUrl}/products` , { cache: 'no-store' });
    return data.json();
  } catch (error) {
    console.log(error);
    return error;
  }
}

export const getProductByProductId = async (productId) => {
  try {
    const data = await fetch(`${adminApiUrl}/products/${productId}` , { cache: 'no-store' });
    return data.json();
  } catch (error) {
    console.log(error);
    return error;
  }
}

export const submitNewProductByAxios = async (productData) => {
  await axios({
    url: `${adminApiUrl}/products/new-product`,
    method: "post",
    data: productData,
  })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};

export const EditProductByAxios = async (productId , productData) => {
  await axios({
    url: `${adminApiUrl}/products/${productId}`,
    method: "put",
    data: productData,
  })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};

export const setNewRegisterationForUser = async (userId , registerValue) => {
  await axios({
    url: `${customerApiUrl}/user/register/${userId}`,
    method: "post",
    data: registerValue,
  })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};

export const changeUserRegisteration = async (userId , registerValue) => {
  await axios({
    url: `${customerApiUrl}/user/register/${userId}`,
    method: "put",
    data: registerValue,
  })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};