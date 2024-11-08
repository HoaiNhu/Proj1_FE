import Card from 'react-bootstrap/Card';
import './Card.css';

const CardProduct = ({ img, title, price }) => {
  return (
    <Card style={{ width: '23rem' }}>
      <Card.Img src={img} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Subtitle>{price}</Card.Subtitle>
      </Card.Body>
    </Card>
  );
}

export default CardProduct;
