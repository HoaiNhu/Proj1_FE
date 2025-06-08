import axios from "axios";

const QUIZ_API = "/api/quiz";

// Hàm helper để lấy token từ localStorage
const getAuthHeader = () => {
  const token = localStorage.getItem("access_token");
  return token ? { token: `Bearer ${token}` } : {};
};

class QuizService {
  // Lấy danh sách câu hỏi
  async getQuizzes() {
    try {
      const response = await axios.get(QUIZ_API);
      return response.data;
    } catch (error) {
      throw new Error("Lỗi khi lấy danh sách câu hỏi: " + error.message);
    }
  }

  // Lưu một câu trả lời
  async saveResponse(quizId, answer, customAnswer = null) {
    try {
      const response = await axios.post(
        `${QUIZ_API}/response`,
        {
          quizId,
          answer,
          customAnswer,
        },
        {
          headers: getAuthHeader(),
        }
      );
      return response.data;
    } catch (error) {
      throw new Error("Lỗi khi lưu câu trả lời: " + error.message);
    }
  }

  // Lưu nhiều câu trả lời cùng lúc
  async saveMultipleResponses(responses) {
    try {
      const response = await axios.post(
        `${QUIZ_API}/responses`,
        {
          responses,
        },
        {
          headers: getAuthHeader(),
        }
      );
      return response.data;
    } catch (error) {
      throw new Error("Lỗi khi lưu câu trả lời: " + error.message);
    }
  }

  // Lấy lịch sử quiz của user
  async getQuizHistory() {
    try {
      const response = await axios.get(`${QUIZ_API}/history`, {
        headers: getAuthHeader(),
      });
      return response.data;
    } catch (error) {
      throw new Error("Lỗi khi lấy lịch sử quiz: " + error.message);
    }
  }
}

export default new QuizService();
