import React from 'react'
import './CartPage.css'
import ButtonComponent from "../../../components/ButtonComponent/ButtonComponent"
import { useNavigate, useState } from "react-router-dom";
import ProductInfor from '../../../components/ProductInfor/ProductInfor';
import imageProduct from "../../../assets/img/hero_3.jpg"
import QuantityBtn from '../../../components/QuantityBtn/QuantityBtn';
import DeleteBtn from '../../../components/DeleteBtn/DeleteBtn';
import CheckboxComponent from '../../../components/CheckboxComponent/CheckboxComponent';
const CartPage = () => {
    const navigate = useNavigate()
    const handleClick = (path) => {
        navigate(path);
    };

    return (
        <div className="container-xl cart-container">
            <div className='titleHolder'>
                <div>
                    <button className='back_btn'>
                        <svg className='back_icon' xmlns="http://www.w3.org/2000/svg"
                            width="40" height="40" viewBox="0 0 40 40" fill="none" color='#3a060e'>
                            <path d="M6.66675 20L5.95964 19.2929L5.25253 20L5.95964 20.7071L6.66675 20ZM31.6667 21C32.219 21 32.6667 20.5523 32.6667 20C32.6667 19.4477 32.219 19 31.6667 19V21ZM15.9596 9.29289L5.95964 19.2929L7.37385 20.7071L17.3739 10.7071L15.9596 9.29289ZM5.95964 20.7071L15.9596 30.7071L17.3739 29.2929L7.37385 19.2929L5.95964 20.7071ZM6.66675 21H31.6667V19H6.66675V21Z" fill="#33363F" />
                        </svg>
                    </button>
                </div>
                <div>
                    <h1 className='title'>Giỏ hàng</h1>
                </div>
            </div>
            <div className='product_area'>
                <table>
                    <thead>
                        <tr>
                            <div className='HeaderHolder'>
                           <div className='HeaderInfor'>
                            <th className='ProductInforHear'>Thông tin sản phẩm</th>
                            </div>
                            <div className='HeaderPrice'>
                            <th className='PriceHeader'>Đơn giá</th>
                            </div>
                            <div className='HeaderQuantity'>
                            <th className='QuantityHeader'>Số lượng</th>
                            </div>
                            <div className='HeaderMoney'>
                            <th className='MoneyHeader'>Thành tiền</th>
                            </div>
                            </div>
                        </tr>
                        
                    </thead>
                    <tbody>
                        <tr>
                            <div className='LineProduct'>
                                <div>
                                <CheckboxComponent></CheckboxComponent>
                                </div>
                                <div className='ProductInfor'>
                                    <ProductInfor image={imageProduct} name={"Summer Orange Cream"} size={'24cm'}></ProductInfor>
                                </div>
                                <div className='PriceProduct'>
                                    <p className='Price'>250,000 VND</p>
                                </div>
                                <div className='QuantityBtn'>
                                    <QuantityBtn></QuantityBtn>
                                </div>
                                <div className='Money'>
                                <p className='MoneyProduct'>250,000 VND</p>
                                </div>
                                <div className='DeleteBtn'>
                                    <DeleteBtn></DeleteBtn>
                                </div>
                            </div>
                        </tr>
                        <tr>
                            <div className='LineProduct'>
                                <div>
                                <CheckboxComponent></CheckboxComponent>
                                </div>
                                <div className='ProductInfor'>
                                    <ProductInfor image={imageProduct} name={"Summer Orange Cream"} size={'24cm'}></ProductInfor>
                                </div>
                                <div className='PriceProduct'>
                                    <p className='Price'>250,000 VND</p>
                                </div>
                                <div className='QuantityBtn'>
                                    <QuantityBtn></QuantityBtn>
                                </div>
                                <div className='Money'>
                                <p className='MoneyProduct'>250,000 VND</p>
                                </div>
                                <div className='DeleteBtn'>
                                    <DeleteBtn></DeleteBtn>
                                </div>
                            </div>
                        </tr>
                        <tr>
                            <div className='LineProduct'>
                                <div>
                                <CheckboxComponent></CheckboxComponent>
                                </div>
                                <div className='ProductInfor'>
                                    <ProductInfor image={imageProduct} name={"Summer Orange Cream"} size={'24cm'}></ProductInfor>
                                </div>
                                <div className='PriceProduct'>
                                    <p className='Price'>250,000 VND</p>
                                </div>
                                <div className='QuantityBtn'>
                                    <QuantityBtn></QuantityBtn>
                                </div>
                                <div className='Money'>
                                <p className='MoneyProduct'>250,000 VND</p>
                                </div>
                                <div className='DeleteBtn'>
                                    <DeleteBtn></DeleteBtn>
                                </div>
                            </div>
                        </tr>
                        <tr>
                            <div className='LineProduct'>
                                <div>
                                   <CheckboxComponent></CheckboxComponent>
                                </div>
                                <div className='ProductInfor'>
                                    <ProductInfor image={imageProduct} name={"Summer Orange Cream"} size={'24cm'}></ProductInfor>
                                </div>
                                <div className='PriceProduct'>
                                    <p className='Price'>250,000 VND</p>
                                </div>
                                <div className='QuantityBtn'>
                                    <QuantityBtn></QuantityBtn>
                                </div>
                                <div className='Money'>
                                <p className='MoneyProduct'>250,000 VND</p>
                                </div>
                                <div className='DeleteBtn'>
                                    <DeleteBtn></DeleteBtn>
                                </div>
                            </div>
                        </tr>
                    </tbody>
                </table>

                <div className='Btn_area'>
                    <div className='total_holder'>
                        <p className='tongtien'>Tổng tiền:</p>
                        <p className='total'>750,000 VND</p>
                    </div>
                    <div className='Btn_holder'>
                        <button className='Buy_more'
                            onClick={() => handleClick('/products')}>Mua thêm</button>
                        <ButtonComponent className='Buy_btn'>Mua ngay</ButtonComponent>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default CartPage