import React from 'react'
import ProductInfor from '../../../components/ProductInfor/ProductInfor'
import imageProduct from "../../../assets/img/hero_3.jpg"
import './OrderInformation.css'
import ButtonComponent from "../../../components/ButtonComponent/ButtonComponent"
const OrderInformationPage = () => {
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
                    <h1 className='title'> Thông tin đơn hàng</h1>
                </div>
            </div>
            <div className='order_area'>
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

                                <div className='ProductInfor'>
                                    <ProductInfor image={imageProduct} name={"Summer Orange Cream"} size={'24cm'}></ProductInfor>
                                </div>
                                <div className='PriceProduct'>
                                    <p className='Price'>250,000 VND</p>
                                </div>
                                <div className='Quantity'>
                                    <p>x1</p>
                                </div>
                                <div className='Money'>
                                    <p className='MoneyProduct'>250,000 VND</p>
                                </div>
                            </div>
                        </tr>
                        <tr>
                            <div className='LineProduct'>

                                <div className='ProductInfor'>
                                    <ProductInfor image={imageProduct} name={"Summer Orange Cream"} size={'24cm'}></ProductInfor>
                                </div>
                                <div className='PriceProduct'>
                                    <p className='Price'>250,000 VND</p>
                                </div>
                                <div className='Quantity'>
                                    <p>x1</p>
                                </div>
                                <div className='Money'>
                                    <p className='MoneyProduct'>250,000 VND</p>
                                </div>
                            </div>
                        </tr>
                    </tbody>
                    <tfoot>
                        <div className='TongtienHolder'>
                            <p className='tongtien'>Tổng tiền:</p>
                            <p className='thanhtien'>500,000 VND</p>
                        </div>
                    </tfoot>
                </table>
            </div>
            <div className='question'>
                <p className='login-question'>Bạn đã có tài khoản? <a href='./login' target='_blank' className='login-link'>Đăng nhập</a></p>
            </div>

            <div>
                {/* =====Dia chi giao hang===== */}
                <div className='addressHolder'>
                    <p className='DiaChi'>Địa chỉ</p>
                    <div>
                        <input className='input-address' type='text' placeholder='Nhập địa chỉ giao hàng: Số nhà, hẻm, đường,...'></input>
                    </div>
                </div>
                <div className='comboBoxHolder'>
                    <div className='ProvinceHolder'>
                        <select className='Province' name='Province'>
                            <option value="" disabled selected>Chọn tỉnh</option>
                            <option value={"Bến Tre"}>Bến Tre</option>
                            <option value={"Tiền Giang"}>Tiền Giang</option>
                        </select>
                    </div>
                    <div className='DistrictHolder'>
                        <select className='District' name='District'>
                            <option value="" disabled selected>Chọn quận/huyện</option>
                            <option value={"Bến Tre"}>Bến Tre</option>
                            <option value={"Tiền Giang"}>Tiền Giang</option>
                        </select>
                    </div>
                    <div className='VillageHolder'>
                        <select className='Village' name='Village'>
                            <option value="" disabled selected>Chọn phường/xã</option>
                            <option value={"Bến Tre"}>Bến Tre</option>
                            <option value={"Tiền Giang"}>Tiền Giang</option>
                        </select>
                    </div>
                </div>

                {/* =====Thoi gian giao hang==== */}
                <div className='DeliveryTimeHolder'>
                    <p className='ThoiGian'>Thời gian giao hàng dự kiến:</p>
                    <div className='lableHolder'>
                        <div className='labelTime'>
                            <label className='ChonGio'>Chọn giờ:</label>
                        </div>
                        <div className='lableDate'>
                            <label className='ChonNgay'>Chọn ngày:</label>
                        </div>
                    </div>
                    <div className='comboBoxHolder'>

                        <div className='TimeHolder'>
                            <input type='time' className='clock'></input>
                        </div>

                        <div className='DateHolder'>
                            <input type="date" id="datePicker" className='Datepicker' />
                        </div>
                    </div>
                </div>
                {/* ============Ghi chu don hang======== */}
                <div className='Note'>
                    <div>
                        <label className='labelNote'>Ghi chú đơn hàng:</label>
                        <div>
                            <textarea rows="5" cols="50" placeholder="Nhập ghi chú đơn hàng....." className='inputNote'></textarea>
                        </div>
                    </div>
                </div>

        {/* ================= Button======== */}
                <div className='Button-area'>
                    <button className='chinhsachBtn'><a href='/chinhsach' target='_blank' className='chinhsach'>Chính sách đơn hàng</a></button>
                    <div className='Btn_holder'>
                    <div>
                    <ButtonComponent>Giỏ hàng</ButtonComponent>
                    </div>
                    <ButtonComponent className='Next_btn'>Tiếp theo</ButtonComponent>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default OrderInformationPage;