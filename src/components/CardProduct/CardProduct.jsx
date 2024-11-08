import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './CardComponent.css'
const CardProduct = ( {img, title, price} )=> {
  return (
    <Card style={{ width: '250px' }}>
    <Button className='button'>
     <Card.Body>
        <Card.Img  src= {img} />
      </Card.Body>
        <Card.Title >{title}</Card.Title>
        <Card.Subtitle>{price}</Card.Subtitle>
        </Button>
    </Card>
 
  );
}

export default CardProduct;