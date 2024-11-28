import React from 'react'
import { useState } from 'react';
import './QuantityBtn.css'
const QuantityBtn = () => {
        const [quantity, setQuantity] = useState(1);
      
        const increaseQuantity = () => {
          setQuantity(quantity + 1);
        };
      
        const decreaseQuantity = () => {
          if (quantity > 1) {
            setQuantity(quantity - 1);
          }
        };
  return (
    <div>
         <div className="cart-item__quantity">
        <button className='Minus' onClick={decreaseQuantity}>-</button>
        <span>{quantity}</span>
        <button className='Add' onClick={increaseQuantity}>+</button>
      </div>
    </div>
  )
}

export default QuantityBtn