import axios from "axios";

export const createPayment = async (data) => {
  return await axios.post("/api/payment/create-payment", data);
};
