import React, { useState, useEffect } from "react";
import GameService from "../../../services/GameService";
import CardProduct from "../../../components/CardProduct/CardProduct";
import styles from "./MiniGamePage.module.css";
import ButtonFormComponent from "../../../components/ButtonFormComponent/ButtonFormComponent";

const MiniGamePage = () => {
  const [puzzle, setPuzzle] = useState(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [result, setResult] = useState(null);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [attempts, setAttempts] = useState(0);
  const [maxAttempts] = useState(3);
  const [isCompleted, setIsCompleted] = useState(false);
  const [missingChars, setMissingChars] = useState([]);
  const [hiddenIndices, setHiddenIndices] = useState([]);
  const [currentPuzzle, setCurrentPuzzle] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [showRegret, setShowRegret] = useState(false);
  const [flyingChar, setFlyingChar] = useState(null);

  // Lấy ô chữ khi component mount
  useEffect(() => {
    const fetchPuzzle = async () => {
      try {
        const response = await GameService.getDailyPuzzle();
        if (response.success) {
          setPuzzle(response.data);
          setMissingChars(response.data.missingChars || []);
          setHiddenIndices(response.data.hiddenIndices || []);
          setCurrentPuzzle(response.data.puzzle);

          // Lấy lượt chơi từ localStorage
          const today = new Date().toISOString().split("T")[0];
          const savedAttempts = localStorage.getItem(
            `puzzle_attempts_${today}`
          );
          const savedCompleted = localStorage.getItem(
            `puzzle_completed_${today}`
          );

          if (savedAttempts) {
            setAttempts(parseInt(savedAttempts));
          }
          if (savedCompleted === "true") {
            setIsCompleted(true);
            setShowAnswer(true);
            // Nếu đã hoàn thành, lấy thông tin sản phẩm
            try {
              const productResponse = await GameService.getProductInfo();
              if (productResponse.success) {
                setProduct(productResponse.data);
              }
            } catch (error) {
              console.error("Error fetching product:", error);
            }
          }
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching puzzle:", error);
        setLoading(false);
      }
    };
    fetchPuzzle();
  }, []);

  // Xử lý click vào chữ cái gợi ý với hiệu ứng bay
  const handleHintClick = (char) => {
    if (isCompleted || attempts >= maxAttempts) return;

    // Tìm vị trí ô trống đầu tiên chưa được điền
    const puzzleArray = currentPuzzle.split("");
    const firstEmptyIndex = puzzleArray.findIndex(
      (c, index) => c === "_" && hiddenIndices.includes(index)
    );

    if (firstEmptyIndex !== -1) {
      // Hiệu ứng bay chữ cái
      setFlyingChar({ char, targetIndex: firstEmptyIndex });

      // Sau 1 giây, cập nhật ô chữ
      setTimeout(() => {
        const newPuzzleArray = [...puzzleArray];
        newPuzzleArray[firstEmptyIndex] = char;
        const newPuzzle = newPuzzleArray.join("");
        setCurrentPuzzle(newPuzzle);
        setUserAnswer(newPuzzle.replace(/\s/g, ""));
        setFlyingChar(null);
      }, 1000);
    }
  };

  // Xử lý gửi đáp án
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (attempts >= maxAttempts) {
      setResult({
        success: false,
        message: "Bạn đã hết lượt chơi cho hôm nay!",
      });
      return;
    }

    try {
      const response = await GameService.submitAnswer(userAnswer);
      if (response.success) {
        const { isCorrect, message } = response.data;

        // Cập nhật lượt chơi
        const newAttempts = attempts + 1;
        setAttempts(newAttempts);

        // Lưu vào localStorage
        const today = new Date().toISOString().split("T")[0];
        localStorage.setItem(
          `puzzle_attempts_${today}`,
          newAttempts.toString()
        );

        if (isCorrect) {
          setIsCompleted(true);
          setShowAnswer(true);
          setShowCelebration(true);
          localStorage.setItem(`puzzle_completed_${today}`, "true");

          // Ẩn hiệu ứng chúc mừng sau 3 giây
          setTimeout(() => {
            setShowCelebration(false);
          }, 3000);

          // Lấy thông tin sản phẩm
          try {
            const productResponse = await GameService.getProductInfo();
            if (productResponse.success) {
              setProduct(productResponse.data);
            }
          } catch (error) {
            console.error("Error fetching product:", error);
          }
        } else if (newAttempts >= maxAttempts) {
          // Hết lượt chơi
          setShowAnswer(true);
          setShowRegret(true);

          // Ẩn hiệu ứng tiếc nuối sau 3 giây
          setTimeout(() => {
            setShowRegret(false);
          }, 3000);

          // Lấy thông tin sản phẩm ngay cả khi sai
          try {
            const productResponse = await GameService.getProductInfo();
            if (productResponse.success) {
              setProduct(productResponse.data);
            }
          } catch (error) {
            console.error("Error fetching product:", error);
          }
        }

        setResult({ success: isCorrect, message });
        setUserAnswer(""); // Reset input
      }
    } catch (error) {
      console.error("Error submitting answer:", error);
      setResult({ success: false, message: "Đã có lỗi xảy ra!" });
    }
  };

  const remainingAttempts = maxAttempts - attempts;

  return (
    <div className="container-xl">
      <h2 className={styles.title}>Minigame Giải Mã Ô Chữ</h2>

      {/* Hiệu ứng chúc mừng */}
      {showCelebration && (
        <div className={styles.celebration}>
          <div className={styles.celebrationContent}>
            <h3>🎉 Chúc mừng! 🎉</h3>
            <p>Bạn đã giải đúng ô chữ!</p>
          </div>
        </div>
      )}

      {/* Hiệu ứng tiếc nuối */}
      {showRegret && (
        <div className={styles.regret}>
          <div className={styles.regretContent}>
            <h3>😔 Hết lượt rồi!</h3>
            <p>Đừng buồn, hãy thử lại ngày mai nhé!</p>
          </div>
        </div>
      )}

      {loading ? (
        <p className={styles.message}>Đang tải ô chữ...</p>
      ) : puzzle && puzzle.puzzle ? (
        <>
          <p className={styles.date}>Ngày: {puzzle.date}</p>

          {/* Hiển thị ô chữ */}
          <div className={styles.puzzle}>
            {currentPuzzle &&
              currentPuzzle.split("").map((char, index) => (
                <span
                  key={index}
                  className={`${styles.puzzleChar} ${
                    char === "_" ? styles.emptyChar : ""
                  } ${
                    flyingChar && flyingChar.targetIndex === index
                      ? styles.flyingTarget
                      : ""
                  }`}
                >
                  {char}
                </span>
              ))}
          </div>

          {/* Hiệu ứng bay chữ cái */}
          {flyingChar && (
            <div className={styles.flyingChar}>{flyingChar.char}</div>
          )}

          {/* Hiển thị đáp án khi hết lượt hoặc đã hoàn thành */}
          {showAnswer && puzzle.answer && (
            <div className={styles.answer}>
              <h4>Đáp án đúng:</h4>
              <div className={styles.correctAnswer}>
                {puzzle.answer.split("").map((char, index) => (
                  <span key={index} className={styles.answerChar}>
                    {char}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Gợi ý chữ cái */}
          {!isCompleted && puzzle.hintChars && puzzle.hintChars.length > 0 && (
            <div className={styles.hints}>
              <h4>Gợi ý chữ cái:</h4>
              <div className={styles.hintChars}>
                {puzzle.hintChars.map((char, index) => (
                  <button
                    key={index}
                    className={styles.hintChar}
                    onClick={() => handleHintClick(char)}
                    disabled={attempts >= maxAttempts}
                  >
                    {char}
                  </button>
                ))}
              </div>
              <p className={styles.hintText}>
                Click vào chữ cái để điền vào ô trống
              </p>
            </div>
          )}

          {!isCompleted && (
            <>
              <div className={styles.attempts}>
                <p>Lượt chơi còn lại: {remainingAttempts}</p>
              </div>

              <form onSubmit={handleSubmit} className={styles.form}>
                <input
                  type="text"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value.toUpperCase())}
                  maxLength={puzzle.productLength}
                  placeholder="Hoặc nhập đáp án đầy đủ"
                  className={styles.input}
                  disabled={attempts >= maxAttempts}
                />
                <ButtonFormComponent
                  type="submit"
                  className={styles.buttonSubmit}
                  disabled={attempts >= maxAttempts || !userAnswer.trim()}
                >
                  Gửi đáp án
                </ButtonFormComponent>
              </form>
            </>
          )}

          {result && (
            <div className={styles.result}>
              <p className={result.success ? styles.success : styles.error}>
                {result.message}
              </p>
            </div>
          )}

          {/* Hiển thị sản phẩm dưới dạng CardProduct */}
          {product && (
            <div
              className={`${styles.productSection} ${
                showCelebration ? styles.productCelebration : ""
              } ${showRegret ? styles.productRegret : ""}`}
            >
              <h3 className={styles.productSectionTitle}>
                Sản phẩm của ngày hôm nay:
              </h3>
              <div className={styles.productCard}>
                <CardProduct
                  id={product.id || "puzzle-product"}
                  type="primary"
                  img={product.image}
                  title={product.name}
                  price={product.price}
                  discount={product.discount}
                  averageRating={product.rating}
                  totalRatings={product.totalRatings || 0}
                  onClick={() => {}} // Có thể thêm navigation đến trang chi tiết
                />
              </div>
            </div>
          )}
        </>
      ) : (
        <p className={styles.message}>Không tải được ô chữ!</p>
      )}
    </div>
  );
};

export default MiniGamePage;
