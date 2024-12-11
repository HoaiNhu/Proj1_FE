import axios from "axios";

export const loginUser = async (data) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL_BACKEND}/user/log-in`,
    data,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return res.data;
};


export const signupUser = async (data) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL_BACKEND}/user/sign-up`,
    data,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return res.data;
};
