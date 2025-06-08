import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./QuizzPage.module.css";
import QuizService from "../../../services/QuizService";
import ButtonComponent from "../../../components/ButtonComponent/ButtonComponent";

const QuizzPage = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [customAnswer, setCustomAnswer] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Kiểm tra đăng nhập
    const token = localStorage.getItem("access_token");
    if (!token) {
      setError("Vui lòng đăng nhập để tham gia quiz");
      setLoading(false);
      return;
    }

    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const data = await QuizService.getQuizzes();
        setQuestions(data);
        setCurrentQuestion(data[0]);
        setError(null);
      } catch (error) {
        if (error.message.includes("401")) {
          setError("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
          // Có thể chuyển hướng về trang login
          // navigate("/login");
        } else {
          setError(error.message);
        }
        console.error("Error fetching questions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [navigate]);

  const handleAnswer = async (answer) => {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        setError("Vui lòng đăng nhập để tham gia quiz");
        return;
      }

      const newAnswers = [
        ...answers,
        {
          questionId: currentQuestion._id,
          answer,
          customAnswer: answer === "custom" ? customAnswer : null,
        },
      ];
      setAnswers(newAnswers);

      if (currentIndex < questions.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setCurrentQuestion(questions[currentIndex + 1]);
        setCustomAnswer("");
      } else {
        console.log("Sending answers to server:", newAnswers);
        const result = await QuizService.saveMultipleResponses(newAnswers);
        console.log("Server response:", result);
        setRecommendations(result.recommendations || []);
        setShowResults(true);
      }
    } catch (error) {
      console.error("Full error object:", error);
      if (error.message.includes("401")) {
        setError("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
        // Có thể chuyển hướng về trang login
        // navigate("/login");
      } else {
        setError(error.message);
      }
      console.error("Error handling answer:", error);
    }
  };

  if (loading) {
    return <div className={styles.loading}>Đang tải câu hỏi...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  if (showResults) {
    return (
      <div className={styles.resultsContainer}>
        <h2>Gợi ý bánh dành cho bạn</h2>
        {recommendations.length > 0 ? (
          <div className={styles.recommendations}>
            {recommendations.map((cake) => (
              <div key={cake._id} className={styles.cakeCard}>
                <img src={cake.imageUrl} alt={cake.name} />
                <h3>{cake.name}</h3>
                <p>{cake.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>Chúng tôi đang cập nhật gợi ý cho bạn...</p>
        )}
      </div>
    );
  }

  if (!currentQuestion) {
    return <div className={styles.error}>Không tìm thấy câu hỏi</div>;
  }

  return (
    <div className="container-xl">
      <div className={styles.quizContainer}>
        <div className={styles.progress}>
          Câu hỏi {currentIndex + 1}/{questions.length}
        </div>

        <div className={styles.questionCard}>
          <h2>{currentQuestion.question}</h2>

          <div className={styles.options}>
            {currentQuestion.options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleAnswer(option.value)}
                className={styles.optionButton}
              >
                {option.imageUrl && (
                  <img src={option.imageUrl} alt={option.text} />
                )}
                <span>{option.text}</span>
              </button>
            ))}

            {currentQuestion.allowCustomAnswer && (
              <div className={styles.customAnswer}>
                <input
                  type="text"
                  value={customAnswer}
                  onChange={(e) => setCustomAnswer(e.target.value)}
                  placeholder="Nhập câu trả lời của bạn..."
                />
                <ButtonComponent
                  onClick={() => handleAnswer("custom")}
                  disabled={!customAnswer.trim()}
                >
                  Gửi
                </ButtonComponent>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizzPage;
