import React from "react";
import "./IntroducePage.css";
import "../../../assets/css/style.css";
import img1 from "../../../assets/img/hero_2.jpg";
const IntroducePage = () => {
  return (
    <div>
      <div className="container-xl introduce-container">
        {/* title */}
        <div className="introduce">
          {/* introduce top */}
          <div className="introduce__top">
            <h1 className="introduce__title">GIỚI THIỆU</h1>
            <h3 className="introduce__welcome">
              Chào mừng bạn đến với Avocado Bakery
            </h3>
          </div>

          {/* introduce bot */}
          <div className="introduce__bot">
            {/* introduce left */}
            <div className="introduce__left">
              <div className="introduce__image">
                <img src={img1} alt="Ảnh cái bánh" />
              </div>
              <div className="introduce__image--border"></div>
            </div>
            {/* introduce right */}
            <div className="introduce__right">
              <h4 className="introduce__paragraph--title">
                Câu chuyện thương hiệu
              </h4>
              <p className="introduce__paragraph--content">
                Là một hệ thống đội ngũ nhân viên và lãnh đạo chuyên nghiệp, gồm
                CBCNV và những người thợ đã có kinh nghiệm lâu năm trong các
                công ty đầu ngành. Mô hình vận hành hoạt động công ty được bố
                trí theo chiều ngang, làm gia tăng sự thuận tiện trong việc vận
                hành cỗ máy kinh doanh và gia tăng sự phối hợp thống nhất giữa
                các bộ phận trong công ty.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntroducePage;
