import React from 'react'
import SliderComponent from '../../../components/SliderComponent/SliderComponent'
import slider1 from '../../../assets/img/slider1.webp'
import slider2 from '../../../assets/img/slider2.webp'
import slider3 from '../../../assets/img/slider3.webp'
import CardProduct from '../../../components/CardProduct/CardProduct'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import img1 from '../../../assets/img/cake1.webp'
import Col from 'react-bootstrap/Col'
const HomePage = () => {
  return (
    <div>
      <div>
        <SliderComponent arrImg={[slider1, slider3, slider2 ]}/>
      </div>
      <br/>
      <br/>
      
      <div >
    <Container  className="justify-content-center">
      <Row >
        <Col >
        <CardProduct img= {img1} title="Chocolate Sweet Cream" price={"250.000 VND"} />
        </Col>
        <Col >
        <CardProduct img= {img1} title="Chocolate Sweet Cream" price={"250.000 VND"} />
        </Col>
        <Col >
        <CardProduct img= {img1} title="Chocolate Sweet Cream" price={"250.000 VND"} />
        </Col>
        <Col >
        <CardProduct img= {img1} title="Chocolate Sweet Cream" price={"250.000 VND"} />
        </Col>
      </Row>
  </Container>
      </div>
    </div>
  )
}

export default HomePage