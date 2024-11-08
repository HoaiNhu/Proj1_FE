import React from 'react'
import SliderComponent from '../../../components/SliderComponent/SliderComponent'
import slider1 from '../../../assets/img/slider1.webp'
import slider2 from '../../../assets/img/slider2.webp'
import slider3 from '../../../assets/img/slider3.webp'
import CardProduct from '../../../components/CardProduct/CardProduct'


const HomePage = () => {
  return (
    <div>
      <div>
        <SliderComponent arrImg={[slider1, slider3, slider2 ]}/>
      </div>
      <div>
        <CardProduct>Card 1</CardProduct>
      </div>
    </div>
  )
}

export default HomePage