import axios from "axios";
import { API_URL } from "../constants/index"; // Đường dẫn đến file constant

const GameService = {
  getDailyPuzzle: async () => {
    try {
      const response = await axios.get(`${API_URL}/puzzle`);
      return response.data;
    } catch (error) {
      console.error("Error fetching daily puzzle:", error);
      throw error;
    }
  },

  submitAnswer: async (answer) => {
    try {
      const response = await axios.post(`${API_URL}/puzzle/submit`, { answer });
      return response.data;
    } catch (error) {
      console.error("Error submitting answer:", error);
      throw error;
    }
  },

  getProductInfo: async () => {
    try {
      const response = await axios.get(`${API_URL}/puzzle/product`);
      return response.data;
    } catch (error) {
      console.error("Error fetching product info:", error);
      throw error;
    }
  },
};

export default GameService;
