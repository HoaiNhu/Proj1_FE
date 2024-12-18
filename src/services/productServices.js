import axios from "axios";

export const axiosJWT = axios.create();

export const createproduct = async (data) => {
  const res = await axios.post(`${process.env.REACT_APP_API_URL_BACKEND}/product/creat-product`, data)
  return res.data
};


export const getDetailsproduct = async (id, access_token) => {
  try {
    const res = await axiosJWT.get(
      `${process.env.REACT_APP_API_URL_BACKEND}/product/get-detail-product/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          token: `Bearer ${access_token}`,
        },
      }
    );
    return res.data; // Trả dữ liệu nếu thành công
  } catch (error) {
    // Nếu API trả về lỗi, ném lỗi với thông tin chi tiết
    if (error.response) {
      // API trả về response
      throw {
        // product: error.response.data?.product || "ERR",
        message: error.response.data?.message || "Đã xảy ra lỗi.",
      };
    } else {
      // Lỗi không có response (ví dụ lỗi mạng)
      throw { product: 500, message: "Không thể kết nối đến máy chủ." };
    }
  }
};

export const updateproduct = async (data) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL_BACKEND}/product/update-product`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res.data;
  } catch (error) {
    if (error.response) {
      throw {
        // product: error.response.data?.product || "ERR",
        message: error.response.data?.message || "Đã xảy ra lỗi.",
      };
    } else {
      throw { product: 500, message: "Không thể kết nối đến máy chủ." };
    }
  }
};
