import React from 'react'
import './ProductInforCustom.css'
const ProductInforCustom = ({image, name, size, quantity, price}) => {
    const formatNumber = () => {
        return new Intl.NumberFormat('en-US').format(quantity*price);
      };
      
      
  return (
    <div className='producInfor'>
        <div className='Image1'>
            <img className='imagePro1' src={image}></img>
        </div>
        <div className='infor1'>
            <span>
                <p className='ProName1'>{name}</p>
            </span>
            <span>
                <p className='ProSize1'>{size}</p>
            </span>
        </div>
        <div className='soluongMua'>
            <p className='p1'>x{quantity}</p>
        </div>
        <div className='sotienMua'>
            <p className='p2' >{formatNumber()}VND</p>
        </div>
    </div>
  )
}

export default ProductInforCustom
