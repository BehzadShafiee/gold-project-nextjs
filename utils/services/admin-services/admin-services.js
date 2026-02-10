import axios from "axios";

const adminApiUrl = "http://localhost:3001/admin/api";
const customerApiUrl = "http://localhost:3001/user/api";

// const adminApiUrl = "http://192.168.41.42:3001/admin/api";
// const customerApiUrl = "http://192.168.41.42:3001/user/api";

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
  try {
    const res = await axios({
      url: `${adminApiUrl}/admin/sign-in`,
      withCredentials: true,
      method: "post",
      data: adminData
    })
    return res.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const logInAdminByAxios = async (adminData) => {
  try {
    const res = await axios({
      url: `${adminApiUrl}/admin/log-in`,
      withCredentials: true,
      method: "post",
      data: adminData
    });
    return res.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const logOutAdminByAxios = async (adminId) => {
  try {
    const res = await axios({
    url: `${adminApiUrl}/admin/log-out`,
    withCredentials: true,
    method: "put",
    data: { "adminId" : adminId }
  });
  return res.data;
  } catch (err) {
    console.log(err);
    return err;
  }
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

export const getUserByUserId = async (userId) => {
  try {
    const data = await fetch(`${customerApiUrl}/user/${userId}` , { cache: 'no-store' });
    return data.json();
  } catch (error) {
    console.log(error);
    return error;
  }
}

export const getUserOrdersListByUserId = async (userId) => {
  try {
    const data = await fetch(`${customerApiUrl}/user/orders-list/${userId}` , { cache: 'no-store' });
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

export const getAllNewOrdersByFetch = async (limit) => {
  try {
    const data = await fetch(`${adminApiUrl}/orders/new-orders-list/${limit}` , { cache: 'no-store' });
    return data.json();
  } catch (error) {
    console.log(error);
    return error;
  }
};

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
  try {
    const res = await axios({
      url: `${adminApiUrl}/orders/register/${orderId}`,
      method: "post",
      data: registerValue,
    });
    return res.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const changeOrderRegisterationByOrderId = async (orderId , registerValue) => {
  try {
    const res = await axios({
      url: `${adminApiUrl}/orders/register/${orderId}`,
      method: "put",
      data: registerValue,
    });
    return res.data;
  } catch (err) {
    console.log(err);
    return err;
  }
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

export const getAllProductsWithLastPriceByFetch = async () => {
  try {
    const data = await fetch(`${adminApiUrl}/products/products-last-price` , { cache: 'no-store' });
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

export const getSingleProductPriceChanges = async (productId) => {
  try {
    const data = await fetch(`${adminApiUrl}/products/price-changes/${productId}` , { cache: 'no-store' });
    return data.json();
  } catch (error) {
    console.log(error);
    return error;
  }
}

export const getProductPriceChangesByProductIdByAxios = async (pId) => {
  try {
    const res = await axios({
      url: `${adminApiUrl}/products/price-changes/${pId}`,
      method: "get",
      // data: registerValue,
    });
    return res.data;
  } catch (err) {
    console.log(err);
    return err;
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
  try {
    const res = await axios({
      url: `${customerApiUrl}/user/register/${userId}`,
      method: "post",
      data: registerValue,
    });
    return res.data; 
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const changeUserRegisteration = async (userId , registerValue) => {
  try {
    const res = await axios({
      url: `${customerApiUrl}/user/register/${userId}`,
      method: "put",
      data: registerValue,
    });
    return res.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};