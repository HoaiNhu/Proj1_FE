import Card from 'react-bootstrap/Card';
import styles from './CardNews.css'
const CardNews = ({ img, title , detail}) => {
  return (
    <Card
      style={{
        width: "29rem",
        overflow: "hidden",
        borderRadius: 15
      }} >
      <Card.Img src={img} 
        style={{
          borderTopLeftRadius:'15px',
          borderTopRightRadius: '15px',
          objectFit: "cover",
          height: "auto",
          width: "auto"
        }}
      />
     
      <Card.Body >
        <Card.Title
          style={{
            fontFamily: 'Poppins',
            fontSize: 16,
            fontWeight: 400,
            lineHeight: 1.5,
            textTransform: "capitalize",
            textAlign: "center",
          }}
        >{title}</Card.Title>
        
          <Card.Subtitle
            style={{
              color: "#B1E321",
              fontFamily: 'Poppins',
              fontSize: 20,
              fontWeight: 700,
              lineHeight: 1.5,
              textTransform: "capitalize",
              textAlign: "center",
            }}
          >{}
          </Card.Subtitle>
        {detail}
      </Card.Body>
      </Card>
  )}
  export default CardNews