import React, { useState, useEffect } from "react";
import GameService from "../../services/GameService";
import styles from "./MiniGamePage.module.css";

const MiniGamePage = () => {
  const [puzzle, setPuzzle] = useState(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [result, setResult] = useState(null);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // Lấy ô chữ khi component mount
  useEffect(() => {
    const fetchPuzzle = async () => {
      try {
        const data = await GameService.getDailyPuzzle();
        setPuzzle(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchPuzzle();
  }, []);

  // Xử lý gửi đáp án
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await GameService.submitAnswer(userAnswer);
      setResult(response);
      if (response.success) {
        const productData = await GameService.getProductInfo();
        setProduct(productData);
      }
    } catch (error) {
      setResult({ success: false, message: "Đã có lỗi xảy ra!" });
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Minigame Giải Mã Ô Chữ</h2>
      {loading ? (
        <p className={styles.message}>Đang tải ô chữ...</p>
      ) : puzzle ? (
        <>
          <p className={styles.date}>Ngày: {puzzle.date}</p>
          <div className={styles.puzzle}>
            {puzzle.puzzle.split("").map((char, index) => (
              <span key={index} className={styles.puzzleChar}>
                {char}
              </span>
            ))}
          </div>
          <form onSubmit={handleSubmit} className={styles.form}>
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value.toUpperCase())}
              maxLength={puzzle.productLength}
              placeholder="Nhập đáp án của bạn"
              className={styles.input}
            />
            <button type="submit" className={styles.button}>
              Gửi đáp án
            </button>
          </form>
          {result && (
            <div className={styles.result}>
              <p className={result.success ? styles.success : styles.error}>
                {result.message}
              </p>
            </div>
          )}
          {product && (
            <div className={styles.product}>
              <h3 className={styles.productName}>{product.name}</h3>
              <img
                src={product.image}
                alt={product.name}
                className={styles.productImage}
              />
              <p className={styles.productDescription}>{product.description}</p>
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
