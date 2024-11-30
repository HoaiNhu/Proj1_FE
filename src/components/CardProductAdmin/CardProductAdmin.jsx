import Card from "react-bootstrap/Card";
import styles from "./CardProductAdmin.css";
import TagPriceComponent from "../TagPriceComponent/TagPriceComponent";
import { Button, Col, Row } from "react-bootstrap";
const CardProductAdmin = ({ type, img, title, price }) => {
  return (
    <Card
      style={{
        width: "29rem",
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
          objectFit: "cover",
          height: "auto",
          width: "auto",
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
                  height: 40
                }}
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
            <Col style={{marginTop:-30, marginLeft:90}}>
            <button className="delete-productBtn">
            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="24" viewBox="0 0 19 24" fill="none">
  <path d="M1.35714 21.3333C1.35714 22.8 2.57857 24 4.07143 24H14.9286C16.4214 24 17.6429 22.8 17.6429 21.3333V8C17.6429 6.53333 16.4214 5.33333 14.9286 5.33333H4.07143C2.57857 5.33333 1.35714 6.53333 1.35714 8V21.3333ZM17.6429 1.33333H14.25L13.2864 0.386667C13.0421 0.146667 12.6893 0 12.3364 0H6.66357C6.31071 0 5.95786 0.146667 5.71357 0.386667L4.75 1.33333H1.35714C0.610714 1.33333 0 1.93333 0 2.66667C0 3.4 0.610714 4 1.35714 4H17.6429C18.3893 4 19 3.4 19 2.66667C19 1.93333 18.3893 1.33333 17.6429 1.33333Z" fill="#3A060E"/>
</svg>
           </button>
            </Col>
          </Row>
        </div>
      )}
    </Card>
  );
};

export default CardProductAdmin;
