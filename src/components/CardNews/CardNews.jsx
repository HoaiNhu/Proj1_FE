import Card from 'react-bootstrap/Card';
import './CardNews.css'
import LinesEllipsis from 'react-lines-ellipsis';
import { CardSubtitle } from 'react-bootstrap';
const CardNews = ({ img, title, detail }) => {
  return (
    <Card className='CardNews'
      style={{
        width: "37.7rem",
        overflow: "hidden",
        borderRadius: 15
      }} >
      <Card.Img src={img}
        style={{
          borderTopLeftRadius: '15px',
          borderTopRightRadius: '15px',
          objectFit: "cover",
          height: "28.2rem",
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
            fontWeight: 700,
            marginLeft: 25,
            marginRight: 25
          }}
        >{title}</Card.Title>
        <CardSubtitle>
          <LinesEllipsis
            text={detail}
            maxLine='2' // Số dòng tối đa
            ellipsis='...'
            trimRight
            basedOn='words'
            style={{
              fontSize: 16,
              marginLeft: 25,
              fontWeight: 300
            }}
          />
        </CardSubtitle>
      </Card.Body>
    </Card>
  )
}
export default CardNews