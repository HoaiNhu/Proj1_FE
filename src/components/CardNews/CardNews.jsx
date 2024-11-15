import Card from 'react-bootstrap/Card';
import styles from './CardNews.css'
import LinesEllipsis from 'react-lines-ellipsis';
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
            fontWeight: 700
          }}
        >{title}</Card.Title>
        
        <LinesEllipsis
              text={detail}
              maxLine='2' // Số dòng tối đa
              ellipsis='...'
              trimRight
              basedOn='words'
              style={{
                fontSize: 16,
                alignContent: 'center'
              }}
            />
      </Card.Body>
      </Card>
  )}
  export default CardNews