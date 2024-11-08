import React from 'react'
import SliderComponent from '../../../components/SliderComponent/SliderComponent'
import slider1 from '../../../assets/img/slider1.webp'
import slider2 from '../../../assets/img/slider2.webp'
import slider3 from '../../../assets/img/slider3.webp'
import slider4 from '../../../assets/img/slider4.webp'
import slider5 from '../../../assets/img/slider5.webp'
import slider6 from '../../../assets/img/slider6.webp'

const HomePage = () => {
  return (
    <div>
      <div>
        <SliderComponent arrImg={[slider1, slider2, slider3, slider6, slider5]}/>
      </div>
    </div>
  )
}

export default HomePage