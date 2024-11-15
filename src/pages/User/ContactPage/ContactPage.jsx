import React from 'react'
import './ContactPage.css'
import address from '../../../assets/img/address.png'
const ContactPage = () => {
    return (
        <div >
            <h1 className='h1'>LIÊN HỆ</h1>
            <div style={{ display: 'flex' }}>
                <div style={{ width: 'auto' }}>
                    <div style={{ marginLeft: 137, marginTop: 30 }}>
                        <h3>Công ty TNHH Avocado</h3>

                        <label>
                            Địa chỉ: Đường Mạc Đĩnh Chi, khu phố Tân Hòa, Dĩ An, Bình Dương
                        </label>
                        <br />
                        <label>
                            Email: abc123@gmail.com
                        </label>
                        <br />
                        <label>
                            Website: avocado.com
                        </label>
                    </div>
                    <div style={{ marginLeft: 137, marginTop: 30 }}>
                        <h3>Hotline</h3>
                        <label>
                            Số điện thoại: 0912345678
                        </label>
                        <br />
                        <label>
                            Hotline CSKH: 0999999999
                        </label>
                    </div>
                </div>
                <div>
                    <a href='https://www.google.com/maps/dir//%C4%90.+M%E1%BA%A1c+%C4%90%C4%A9nh+Chi,+Khu+ph%E1%BB%91+T%C3%A2n+H%C3%B2a,+D%C4%A9+An,+B%C3%ACnh+D%C6%B0%C6%A1ng/@10.8822003,106.7000994,12z/data=!4m8!4m7!1m0!1m5!1m1!1s0x3174d89aad780e49:0x54542761d4c22175!2m2!1d106.7825013!2d10.8822113?entry=ttu&g_ep=EgoyMDI0MTExMi4wIKXMDSoASAFQAw%3D%3D'>
                        <img className='img' src={address}>
                        </img>
                    </a>
                </div>
            </div>
        </div>

    )
}

export default ContactPage