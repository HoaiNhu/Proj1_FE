import Card from "react-bootstrap/Card";
import React, { useState } from 'react';
import styles from "./CardProductAdmin.css";
import TagPriceComponent from "../TagPriceComponent/TagPriceComponent";
import { Button, Col, Row, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axios from 'axios'; // For making API calls

const CardProductAdmin = ({ type, img, title, price, productId, onDelete, onUpdate }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false); // State for showing confirmation modal
  const [loading, setLoading] = useState(false); // State for loading indicator

  const handleUpdateClick = () => {
    navigate("/update-product"); // Navigate to the update product page
    if (onUpdate) {
      onUpdate(); // Call the onUpdate function passed from the parent
    }
  };

  const handleDeleteClick = () => {
    setShowModal(true); // Show the confirmation modal
  };

  // Function to handle confirmation and call delete API
  const handleDeleteConfirm = async () => {
    try {
      setLoading(true); // Set loading state while waiting for the API response
      await axios.delete(`/api/product/delete-product/${productId}`); // Call the API to delete the product using productId
      setLoading(false); // Reset loading state after API response
      setShowModal(false); // Close the confirmation modal
      if (onDelete) {
        onDelete(); // Call the onDelete function passed from the parent
      }
    } catch (error) {
      setLoading(false);
      console.error("Error deleting product:", error);
    }
  };

  // Function to handle cancel (closes the modal)
  const handleDeleteCancel = () => {
    setShowModal(false); // Close the confirmation modal without deleting
  };

  return (
    <Card
      style={{
        width: "29rem", // Kích thước của Card
        overflow: "hidden",
        borderRadius: 15,
        margin: "auto",
      }}
      className={type === "primary" ? styles.primary : styles.secondary}
    >
      <Card.Img
        src={img}
        className={type === "primary" ? styles.primary : styles.secondary}
        style={{
          borderTopLeftRadius: "15px",
          borderTopRightRadius: "15px",
          objectFit: "cover", // Giúp ảnh bao phủ toàn bộ không gian của khung
          height: "200px", // Thiết lập chiều cao cố định cho ảnh
          width: "100%", // Ảnh sẽ chiếm toàn bộ chiều rộng của khung
        }}
      />
      <Card.Body>
        <Card.Title
          style={{
            fontFamily: "Poppins",
            fontSize: 16,
            fontWeight: 300,
            lineHeight: 1.5,
            textTransform: "capitalize",
            textAlign: "center",
          }}
        >
          {title}
        </Card.Title>
        {type === "secondary" && (
          <Card.Subtitle
            style={{
              color: "#B1E321",
              fontFamily: "Poppins",
              fontSize: 20,
              fontWeight: 700,
              lineHeight: 1.5,
              textTransform: "capitalize",
              textAlign: "center",
            }}
          >
            {price}
          </Card.Subtitle>
        )}
      </Card.Body>
      {type === "primary" && (
        <div>
          <Row>
            <Col>
              <Button
                style={{
                  width: 55,
                  paddingLeft: 20,
                  marginLeft: 110,
                  backgroundColor: " var(--brown100)",
                  border: "none",
                  borderTopRightRadius: 15,
                  height: 40,
                }}
                onClick={handleUpdateClick}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                  <path d="M14.6458 9.39583L15.6042 10.3542L6.16667 19.7917H5.20833V18.8333L14.6458 9.39583ZM18.3958 3.125C18.1354 3.125 17.8646 3.22917 17.6667 3.42708L15.7604 5.33333L19.6667 9.23958L21.5729 7.33333C21.6695 7.23696 21.7461 7.1225 21.7984 6.99648C21.8506 6.87047 21.8775 6.73538 21.8775 6.59896C21.8775 6.46253 21.8506 6.32745 21.7984 6.20143C21.7461 6.07542 21.6695 5.96095 21.5729 5.86458L19.1354 3.42708C18.9271 3.21875 18.6667 3.125 18.3958 3.125ZM14.6458 6.44792L3.125 17.9687V21.875H7.03125L18.5521 10.3542L14.6458 6.44792Z" fill="white" />
                </svg>
              </Button>
            </Col>
         
            <Col>
              <TagPriceComponent style={{ marginTop: -40 }}>
                {price}
              </TagPriceComponent>
            </Col>
            <Col style={{ marginTop: -30, marginLeft: 90 }}>
              <button className="delete-productBtn" onClick={handleDeleteClick}>
                <svg xmlns="http://www.w3.org/2000/svg" width="19" height="24" viewBox="0 0 19 24" fill="none">
                  <path d="M1.35714 21.3333C1.35714 22.8 2.57857 24 4.07143 24H14.9286C16.4214 24 17.6429 22.8 17.6429 21.3333V8C17.6429 6.53333 16.4214 5.33333 14.9286 5.33333H4.07143C2.57857 5.33333 1.35714 6.53333 1.35714 8V21.3333ZM17.6429 1.33333H14.25L13.2864 0.386667C13.0421 0.146667 12.6893 0 12.3364 0H6.66357C6.31071 0 5.95786 0.146667 5.71357 0.386667L4.75 1.33333H1.35714C0.610714 1.33333 0 1.93333 0 2.66667C0 3.4 0.610714 4 1.35714 4H17.6429C18.3893 4 19 3.4 19 2.66667C19 1.93333 18.3893 1.33333 17.6429 1.33333Z" fill="#3A060E"/>
                </svg>
              </button>
            </Col>
          </Row>
          <Modal show={showModal} onHide={handleDeleteCancel}>
            <Modal.Header closeButton>
              <Modal.Title>Confirm Deletion</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete this product?</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleDeleteCancel}>
                Cancel
              </Button>
              <Button variant="danger" onClick={handleDeleteConfirm} disabled={loading}>
                {loading ? "Deleting..." : "Delete"}
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      )}
    </Card>
  );
};

export default CardProductAdmin;
