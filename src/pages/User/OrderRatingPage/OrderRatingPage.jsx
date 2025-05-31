import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./OrderRatingPage.css";
import { Button, Card, Form } from "react-bootstrap";
import RatingStar from "../../../components/RatingStar/RatingStar";
import {
  createProductRating,
  getDetailsOrder,
} from "../../../services/OrderService";
import { useSelector } from "react-redux";

const OrderRatingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderId } = useParams();
  const [order, setOrder] = useState(location.state?.order);
  const [ratings, setRatings] = useState({});
  const [comments, setComments] = useState({});
  const [ratingErrors, setRatingErrors] = useState({});
  const access_token = localStorage.getItem("access_token");
  const user = useSelector((state) => state.user);

  if (!order || order._id !== orderId) {
    return <div>Không tìm thấy thông tin đơn hàng!</div>;
  }

  const handleRatingChange = (productId, rating) => {
    setRatings((prev) => ({
      ...prev,
      [productId]: rating,
    }));
    // Xóa lỗi khi người dùng đã chọn rating
    if (rating > 0) {
      setRatingErrors((prev) => ({
        ...prev,
        [productId]: "",
      }));
    }
  };

  const handleCommentChange = (productId, comment) => {
    setComments((prev) => ({
      ...prev,
      [productId]: comment,
    }));
  };

  const handleSubmitRating = async (productId) => {
    if (!ratings[productId]) {
      setRatingErrors((prev) => ({
        ...prev,
        [productId]: "Vui lòng chọn số sao đánh giá",
      }));
      return;
    }

    try {
      const response = await createProductRating(
        {
          productId,
          orderId: order._id,
          rating: ratings[productId],
          comment: comments[productId] || "",
        },
        access_token
      );

      if (response.status === "OK") {
        // Xóa rating và comment đã gửi
        setRatings((prev) => {
          const newRatings = { ...prev };
          delete newRatings[productId];
          return newRatings;
        });
        setComments((prev) => {
          const newComments = { ...prev };
          delete newComments[productId];
          return newComments;
        });
        alert("Đánh giá thành công!");
        // Fetch lại chi tiết đơn hàng để cập nhật trạng thái đánh giá
        const updatedOrder = await getDetailsOrder(order._id);
        setOrder(updatedOrder.data);
        // Nếu muốn chuyển về trang home sau khi đánh giá hết tất cả sản phẩm thì kiểm tra tại đây
        // if (updatedOrder.data.orderItems.every((item) => item.rating)) {
        //   navigate("/");
        // }
        navigate("/");
      }
    } catch (error) {
      alert(error.message || "Có lỗi xảy ra khi đánh giá");
    }
  };

  const handleBack = () => {
    navigate("/order-history");
  };

  return (
    <div className="container-xl">
      <div className="rating-page">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Đánh giá sản phẩm</h2>
          <Button variant="outline-secondary" onClick={handleBack}>
            Quay lại
          </Button>
        </div>

        <div className="order-info mb-4">
          <p>Mã đơn hàng: {order.orderCode}</p>
          <p>
            Ngày đặt: {new Date(order.createdAt).toLocaleDateString("vi-VN")}
          </p>
        </div>

        <div className="products-list">
          {order.orderItems.map(
            (item, index) =>
              item.product && (
                <Card key={index} className="mb-4 product-rating-card">
                  <Card.Body>
                    <div className="d-flex">
                      <img
                        src={item.product.productImage}
                        alt={item.product.productName}
                        className="product-image"
                      />
                      <div className="product-info">
                        <h5>{item.product.productName}</h5>
                        <p>Kích thước: {item.product.productSize} cm</p>
                        <p>Số lượng: {item.quantity}</p>
                      </div>
                    </div>

                    <div className="rating-section mt-3">
                      <div className="mb-2">
                        <label>Chọn số sao:</label>
                        <RatingStar
                          rating={ratings[item.product._id] || 0}
                          setRating={(rating) =>
                            handleRatingChange(item.product._id, rating)
                          }
                          isEditable={true}
                          size={24}
                          showRating={false}
                        />
                        {ratingErrors[item.product._id] && (
                          <div className="text-danger mt-1">
                            {ratingErrors[item.product._id]}
                          </div>
                        )}
                      </div>

                      <Form.Group className="mb-3">
                        <Form.Label>Nhận xét của bạn:</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          value={comments[item.product._id] || ""}
                          onChange={(e) =>
                            handleCommentChange(
                              item.product._id,
                              e.target.value
                            )
                          }
                          placeholder="Nhập nhận xét của bạn về sản phẩm..."
                          maxLength={500}
                        />
                        <Form.Text className="text-muted">
                          {(comments[item.product._id] || "").length}/500 ký tự
                        </Form.Text>
                      </Form.Group>

                      <Button
                        variant="primary"
                        onClick={() => handleSubmitRating(item.product._id)}
                        disabled={!!item.rating}
                      >
                        {item.rating ? "Đã đánh giá" : "Gửi đánh giá"}
                      </Button>

                      {item.rating && (
                        <div className="mt-2">
                          <p>Đánh giá của bạn:</p>
                          <RatingStar
                            rating={item.rating.rating}
                            setRating={() => {}}
                            isEditable={false}
                            size={16}
                            showRating={true}
                          />
                          {item.rating.comment && (
                            <p className="mt-2">{item.rating.comment}</p>
                          )}
                        </div>
                      )}
                    </div>
                  </Card.Body>
                </Card>
              )
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderRatingPage;
