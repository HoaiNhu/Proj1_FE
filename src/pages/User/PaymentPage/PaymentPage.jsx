import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './PaymentPage.css'
import imageProduct from '../../../assets/img/hero_3.jpg'
import ButtonComponent from '../../../components/ButtonComponent/ButtonComponent';
import ProductInforCustom from '../../../components/ProductInfor/ProductInforCustom';
const PaymentPage = () => {
    const [value, setValue] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [error, setError] = useState('');
    const handleChange1 = (e) => {
        const value2 = e.target.value;
        // Kiểm tra chỉ nhập số và không vượt quá 10 ký tự
        if (/^\d{0,10}$/.test(value2)) {
            setPhoneNumber(value2);
            setError('');
        }
    };
    const handleChange2 = (e) => {
        const inputValue = e.target.value;

        // Chỉ cho phép nhập các ký tự số
        if (/^\d*$/.test(inputValue)) {
            setValue(inputValue);
        }
    };

    const handleBlur = () => {
        // Kiểm tra độ dài chính xác là 10 số
        if (phoneNumber.length !== 10) {
            setError('Số điện thoại phải bao gồm đúng 10 số.');
        } else {
            setError(''); // Xóa lỗi nếu nhập đúng
        }
    };
    //Su kien click
    const navigate = useNavigate()
    const handleClickBack = () => {
        navigate("/order-information");
      };

      const handleClickPay = () => {
        navigate("/");
        alert ("Đặt hàng thành công!!!")
      };

    return (
        <div className='container-xl'>
            <div className='container-xl-pay'>
                {/* =========================THONG TIN THANH TOAN=========================        */}
                <div className='PaymentInfor'>
                    <p className='pThongtin'>Thông tin thanh toán</p>
                    {/* ==========Ngan hang-Vi dien tu========= */}
                    <div className='PayHolder'>
                        <div className='BankHolder'>
                            <select className='Bank' name='Bank'>
                                <option value="" disabled selected>Chọn ngân hàng</option>
                                <option value={"Bến Tre"}>Bến Tre</option>
                                <option value={"Tiền Giang"}>Tiền Giang</option>
                            </select>
                        </div>
                        <div className='E-walletHolder'>
                            <select className='E-wallet' name='E-wallet'>
                                <option value="" disabled selected>Chọn ví điện tử</option>
                                <option value={"Momo"}>Momo</option>
                                <option value={"Zalo Pay"}>Zalo Pay</option>
                            </select>
                        </div>
                    </div>
                    {/* ===========So tai khoan- So dien thoai======== */}
                    <div className='inputH1'>
                        <div className='inputStk'>
                            <input type='text' className='input1' placeholder='Nhập số tài khoản' onChange={handleChange2} value={value}></input>
                        </div>

                        <div className='inputSdt'>
                            <span>
                                <input type='text' className='input2' placeholder='Nhập số điện thoại'
                                    onChange={handleChange1}
                                    onBlur={handleBlur} value={phoneNumber}></input>
                            </span>
                            <span style={{ color: 'red', fontSize: '12px' }}>{error}</span>
                        </div>
                    </div>
                    {/* ==================Button=========== */}
                    <div className='Button-area-pay'>
                        <div className='button1'>
                            <ButtonComponent onClick={handleClickBack}>Quay lại</ButtonComponent>
                        </div>
                        <div className='button2'>
                            <ButtonComponent className='customBtn2' onClick={handleClickPay}>Thanh toán</ButtonComponent>
                        </div>

                    </div>
                </div>

                {/* ======================= THONG TIN DON HANG (CO PHI VAN CHUYEN)===============       */}
                <div className='final-order'>
                    <div >
                        <ProductInforCustom image={imageProduct} name={"Summer Orange Cream"} size={'24cm'} price={250000} quantity={1}></ProductInforCustom>
                    </div>
                    <div >
                        <ProductInforCustom image={imageProduct} name={"Summer Orange Cream"} size={'24cm'} price={250000} quantity={1}></ProductInforCustom>
                    </div>
                    <div >
                        <ProductInforCustom image={imageProduct} name={"Summer Orange Cream"} size={'24cm'} price={250000} quantity={1}></ProductInforCustom>
                    </div>
                    <div >
                        <ProductInforCustom image={imageProduct} name={"Summer Orange Cream"} size={'24cm'} price={250000} quantity={1}></ProductInforCustom>
                    </div>
                    <div >
                        <ProductInforCustom image={imageProduct} name={"Summer Orange Cream"} size={'24cm'} price={250000} quantity={1}></ProductInforCustom>
                    </div>
                    {/* ===============TIEN CAN THANH TOAN============   */}
                    <div className='footerAreaPayment'>
                        <div className='tamtinh'>
                            <p className='tamtinh1'>Tạm tính:</p>
                            <p className='tamtinh2'>1,250,000 VND</p>
                        </div>
                        <div className='tamtinhVanChuyen'>
                            <p className='tamtinhVanChuyen1'>Tổng tiền (gồm phí vận chuyển):</p>
                            <p className='tamtinhVanChuyen2'>1,280,000 VND</p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default PaymentPage