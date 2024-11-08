import React from 'react'
import SliderComponent from '../../../components/SliderComponent/SliderComponent'
import slider1 from '../../../assets/img/slider1.webp'
import slider2 from '../../../assets/img/slider2.webp'
import slider3 from '../../../assets/img/slider3.webp'
import CardProduct from '../../../components/CardProduct/CardProduct'
import image1 from '../../../assets/img/cake1.webp'
import { Col } from 'react-bootstrap'
import {Row} from 'react-bootstrap'
const HomePage = () => {
  return (
    <div>
      {/* Banner quànrg cáo */}
      <div >
        <SliderComponent arrImg={[slider1, slider3, slider2 ]}/>
      </div>
      <div  style={{ marginTop:80,paddingTop: 60, paddingBottom: 50, backgroundColor: "#3A060E", width:"width-screen" }}>
      <h1 style={{ color: "white", textAlign: "center", marginBottom: "50px", fontSize: "4rem"}}>SẢN PHẨM NỔI BẬT</h1>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' , paddingBottom: 50}}>
        <svg xmlns="http://www.w3.org/2000/svg" width="79" height="90" viewBox="0 0 111 127" fill="none" >
          <g clip-path="url(#clip0_261_214)">
          <path d="M39.4694 1.33946C41.402 -0.47128 44.4 -0.446476 46.3326 1.36427C53.171 7.78868 59.5882 14.7092 65.5842 22.2002C68.3096 18.6283 71.4067 14.734 74.7516 11.559C76.7089 9.72345 79.7317 9.72345 81.6891 11.5838C90.2618 19.7693 97.5214 30.5842 102.625 40.8533C107.655 50.9736 111 61.3172 111 68.6098C111 100.261 86.2728 127 55.5 127C24.3804 127 0 100.236 0 68.585C0 59.06 4.41027 47.4266 11.2487 35.9172C18.1614 24.2342 27.9234 12.0551 39.4694 1.33946ZM55.9212 103.188C62.1897 103.188 67.7397 101.451 72.9676 97.9785C83.3987 90.686 86.1984 76.1008 79.9299 64.641C78.815 62.4086 75.9656 62.2598 74.3551 64.1449L68.1114 71.4127C66.4761 73.2979 63.5277 73.2483 61.9915 71.2887C57.9033 66.0797 50.5942 56.7779 46.4317 51.4945C44.8708 49.5102 41.8975 49.4854 40.3118 51.4697C31.9373 62.0117 27.7252 68.6594 27.7252 76.1256C27.75 93.1168 40.2871 103.188 55.9212 103.188Z" fill="#B1E321"/>
          </g>
          <defs>
            <clipPath id="clip0_261_214">
              <rect width="111" height="127" fill="white"/>
            </clipPath>
          </defs>
        </svg>
      </div >


  {/* 1 slide  */}
        <Row style={{width: 1000, margin: 'auto',  cursor: 'pointer'}}>
          <Col>
            <CardProduct img={image1} title={"Chocolate Sweet Cream"} price={"250.000 VND"}/>
          </Col>
          <Col>
            <CardProduct img={image1} title={"Chocolate Sweet Cream"} price={"250.000 VND"}/>
          </Col>
          <Col>
            <CardProduct img={image1} title={"Chocolate Sweet Cream"} price={"250.000 VND"}/>
          </Col>
          <Col>
            <CardProduct img={image1} title={"Chocolate Sweet Cream"} price={"250.000 VND"}/>
          </Col>
        </Row>
      </div>
      <div>
        <h1 style={{ color: "#3A060E", textAlign: "center", marginTop: "80px", fontSize: "4rem"}}>SẢN PHẨM</h1>
        <Row style={{width: 1000, margin: 'auto',  cursor: 'pointer'}}>
          <Col>
            <CardProduct img={image1} title={"Chocolate Sweet Cream"} price={"250.000 VND"}/>
          </Col>
         
        </Row>
      </div>
    </div>
  )
}

export default HomePage