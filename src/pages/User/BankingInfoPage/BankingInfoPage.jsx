import React from "react";
import "./BankingInfoPage.css";
import qr1 from "../../../assets/img/QR1.png";
import qr2 from "../../../assets/img/QR2.png";

const BankingInfoPage = () => {
  return (
    <div>
      <div className="container-xl">
        <div className="title-row">
          <svg
            className="back-icon"
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
          >
            <path
              d="M6.66699 20L5.95989 19.2929L5.25278 20L5.95989 20.7071L6.66699 20ZM31.667 21C32.2193 21 32.667 20.5523 32.667 20C32.667 19.4477 32.2193 19 31.667 19V21ZM15.9599 9.29289L5.95989 19.2929L7.3741 20.7071L17.3741 10.7071L15.9599 9.29289ZM5.95989 20.7071L15.9599 30.7071L17.3741 29.2929L7.3741 19.2929L5.95989 20.7071ZM6.66699 21H31.667V19H6.66699V21Z"
              fill="currentColor"
            />
          </svg>
          <h2 className="title__content">Thông tin chuyển khoản</h2>
        </div>

       <div className="container-banking">
            <div className="banking-info">
              {/* item 1 */}
              <section className="item-banking">
                <img className="img-banking" src={qr1} alt="QR banking 1" />
                <div className="qr-info">
                  <h2 className="owner-name">Lê Văn A</h2>
                  <h2 className="bank-name">BIDV </h2>
                  <h2 className="bank-number">STK: 012345</h2>
                </div>
              </section>
              {/* item 2 */}
              <section className="item-banking">
                <img className="img-banking" src={qr2} alt="QR banking 2" />
                <div className="qr-info">
                  <h2 className="owner-name">Lê Văn A</h2>
                  <h2 className="bank-name">MOMO </h2>
                  <h2 className="bank-number">Số momo: 012345</h2>
                </div>
              </section>
            </div>
       </div>
      </div>
    </div>
  );
};

export default BankingInfoPage;
