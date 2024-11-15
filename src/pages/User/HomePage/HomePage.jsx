import React from 'react';
import SliderComponent from '../../../components/SliderComponent/SliderComponent';
import slider1 from '../../../assets/img/slider1.webp';
import slider2 from '../../../assets/img/slider2.webp';
import slider3 from '../../../assets/img/slider3.webp';
import CardProduct from '../../../components/CardProduct/CardProduct';
import image1 from '../../../assets/img/cake1.webp';
import ButtonNoBGComponent from '../../../components/ButtonNoBGComponent/ButtonNoBGComponent';
import story from '../../../assets/img/story.jpg';
import LinesEllipsis from 'react-lines-ellipsis';
import CardNews from '../../../components/CardNews/CardNews';
import news from '../../../assets/img/news.jpg';
import ButtonComponent from '../../../components/ButtonComponent/ButtonComponent';
import { useNavigate } from "react-router-dom";
const text = 'Tiệm bánh ngọt Avocado - "My sweetie, my love" mang trong mình sứ mệnh mang đến những chiếc bánh ngọt ngào và tinh tế, không chỉ để thỏa mãn vị giác mà còn để lan tỏa tình yêu và niềm vui đến mọi người. Với phương châm "My sweetie, my love," chúng tôi cam kết sử dụng những nguyên liệu tươi ngon nhất, kết hợp với kỹ thuật làm bánh hiện đại và sự sáng tạo không ngừng. Mỗi chiếc bánh từ Avocado không chỉ là một món ăn, mà còn là một tác phẩm nghệ thuật, được chăm chút tỉ mỉ từ khâu chọn nguyên liệu đến khi hoàn thiện. Chúng tôi hy vọng rằng mỗi lần thưởng thức bánh từ Avocado, khách hàng sẽ cảm nhận được tình yêu và sự tận tâm mà chúng tôi gửi gắm trong từng sản phẩm.';

const HomePage = () => {
  const navigate= useNavigate()
  const handleClick = (path) => {
    navigate(path);
  };
  return (

    <div >
      {/* Banner quànrg cáo */}
      <div >
        <SliderComponent arrImg={[slider1, slider3, slider2]} />
      </div>
      <div
        style={{
          marginTop: 100,
          paddingTop: 50,
          paddingBottom: 60,
          backgroundColor: "#3A060E",
          width: "100%"

        }}>
        <h1
          style={{
            color: "white",
            textAlign: "center",
            marginBottom: "50px",
            fontSize: "4rem",
            fontWeight: 700
          }}>SẢN PHẨM NỔI BẬT</h1>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            paddingBottom: 50
          }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="79" height="90" viewBox="0 0 111 127" fill="none" >
            <g clip-path="url(#clip0_261_214)">
              <path d="M39.4694 1.33946C41.402 -0.47128 44.4 -0.446476 46.3326 1.36427C53.171 7.78868 59.5882 14.7092 65.5842 22.2002C68.3096 18.6283 71.4067 14.734 74.7516 11.559C76.7089 9.72345 79.7317 9.72345 81.6891 11.5838C90.2618 19.7693 97.5214 30.5842 102.625 40.8533C107.655 50.9736 111 61.3172 111 68.6098C111 100.261 86.2728 127 55.5 127C24.3804 127 0 100.236 0 68.585C0 59.06 4.41027 47.4266 11.2487 35.9172C18.1614 24.2342 27.9234 12.0551 39.4694 1.33946ZM55.9212 103.188C62.1897 103.188 67.7397 101.451 72.9676 97.9785C83.3987 90.686 86.1984 76.1008 79.9299 64.641C78.815 62.4086 75.9656 62.2598 74.3551 64.1449L68.1114 71.4127C66.4761 73.2979 63.5277 73.2483 61.9915 71.2887C57.9033 66.0797 50.5942 56.7779 46.4317 51.4945C44.8708 49.5102 41.8975 49.4854 40.3118 51.4697C31.9373 62.0117 27.7252 68.6594 27.7252 76.1256C27.75 93.1168 40.2871 103.188 55.9212 103.188Z" fill="#B1E321" />
            </g>
            <defs>
              <clipPath id="clip0_261_214">
                <rect width="111" height="127" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div >


        {/* 1 slide  */}
        {/* <Row
          style={{
            maxWidth: 1000,
            margin: 'auto'
          }}>
          <Col >
            <CardProduct type={"secondary"} img={image1} title={"Chocolate Sweet Cream"} price={"250.000 VND"} />
          </Col>
          <Col >
            <CardProduct type={"secondary"} img={image1} title={"Chocolate Sweet Cream"} price={"250.000 VND"} />
          </Col>
          <Col >
            <CardProduct type={"secondary"} img={image1} title={"Chocolate Sweet Cream"} price={"250.000 VND"} />
          </Col>
          <Col>
            <CardProduct type={"secondary"} img={image1} title={"Chocolate Sweet Cream"} price={"250.000 VND"} />
          </Col>
        </Row> */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', marginLeft: '137px', marginRight: '137px', gap: '18px' }}>
          <CardProduct type={"secondary"} img={image1} title={"Chocolate Sweet Cream"} price={"250.000 VND"} />
          <CardProduct type={"secondary"} img={image1} title={"Chocolate Sweet Cream"} price={"250.000 VND"} />
          <CardProduct type={"secondary"} img={image1} title={"Chocolate Sweet Cream"} price={"250.000 VND"} />
          <CardProduct type={"secondary"} img={image1} title={"Chocolate Sweet Cream"} price={"250.000 VND"} />
        </div>

        <ButtonComponent
            onClick={()=> handleClick('/products')}
            style={{
              margin: 'auto'
      }}>Xem thêm </ButtonComponent>
      </div>

      {/* Sản phẩm */}
      <div
        style={{ width: "100%", marginTop: 50 }}>
        <h1
          style={{
            color: "#3A060E",
            textAlign: "center",
            marginTop: "80px",
            fontSize: "4rem",
            paddingBottom: 10,
            fontWeight: 700
          }}
        >SẢN PHẨM</h1>
        <h3
          style={{
            color: "#3A060E",
            textAlign: "center",
            fontSize: "16px ",
            paddingBottom: 25
          }}>Chào mừng đến với bộ sưu tập bánh của Avocado</h3>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            paddingBottom: 25
          }}>
          <ButtonNoBGComponent>Banh kem</ButtonNoBGComponent>
          <ButtonNoBGComponent>Banh cuoi</ButtonNoBGComponent>
          <ButtonNoBGComponent>Banh ngot</ButtonNoBGComponent>
          <ButtonNoBGComponent>Phu kien</ButtonNoBGComponent>
        </div>
        {/* 1 tab */}
        {/* <Row
          style={{
            maxWidth: 1000,
            margin: 'auto'
            
          }}>
          <Col style={{ marginTop: "10px" }}>
            <CardProduct type={"primary"} img={image1} title={"Chocolate Sweet Cream"} price={"250.000 VND"} />
          </Col>
          <Col style={{ marginTop: "10px" }}>
            <CardProduct type={"primary"} img={image1} title={"Chocolate Sweet Cream"} price={"250.000 VND"} />
          </Col>
          <Col style={{ marginTop: "10px" }}>
            <CardProduct type={"primary"} img={image1} title={"Chocolate Sweet Cream"} price={"250.000 VND"} />
          </Col>
          <Col style={{ marginTop: "10px" }}>
            <CardProduct type={"primary"} img={image1} title={"Chocolate Sweet Cream"} price={"250.000 VND"} />
          </Col>
        </Row> */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', marginLeft: '137px', marginRight: '137px', gap: '18px', paddingBottom: 50 }}>
          <CardProduct type={"primary"} img={image1} title={"Chocolate Sweet Cream"} price={"250.000 VND"} />
          <CardProduct type={"primary"} img={image1} title={"Chocolate Sweet Cream"} price={"250.000 VND"} />
          <CardProduct type={"primary"} img={image1} title={"Chocolate Sweet Cream"} price={"250.000 VND"} />
          <CardProduct type={"primary"} img={image1} title={"Chocolate Sweet Cream"} price={"250.000 VND"} />
        </div>
        <div style={{
          marginBottom: 50,
        }}>
         <ButtonComponent
            onClick={()=> handleClick('/products')}
            style={{
              margin: 'auto'
      }}>Xem thêm </ButtonComponent>
        </div>
      </div>

      {/* Cau chuyen avocado */}
      <div>
        <h1
          style=
          {{
            color: "#3A060E",
            textAlign: "center",
            marginTop: "50px",
            fontSize: "4rem",
            paddingBottom: 10,
            fontWeight: 700
          }}
        > CÂU CHUYỆN AVOCADO</h1>
        <h3
          style=
          {{
            color: "#3A060E",
            textAlign: "center",
            fontSize: "16px ",
            paddingBottom: 25
          }}
        >Avocado tự hào là tiệm bánh Việt chất lượng được xây dựng từ tình yêu dành trọn cho khách hàng</h3>
        <div style={{
          display: 'flex',
          marginRight: '137px'
        }}>
          <div
            style={{
              position: 'absolute',
              backgroundColor: '#b3e42150',
              width: 577,
              height: 406,
              marginLeft: 105,
              marginTop: 17,
              borderRadius: 15
            }} />
          <img src={story}
            style={{
              position: "relative",
              width: '577px',
              height: '406px',
              marginLeft: 137,
              borderRadius: 15,
              flexShrink: 0
            }}></img>

          <div
            style={{
              maxWidth: '56rem',
              maxHeight: '30rem',
              borderRadius: 15,
              background: '#b1e3214d',
              marginLeft: '10rem',
              flexShrink: 0,

              marginTop: '45px'
            }}>
            <h3
              style={{
                color: "#3A060E",
                textAlign: "center",
                marginTop: "80px",
                fontSize: "1.8rem",
                fontWeight: 700,
                marginTop: 45,
                paddingBottom: 25
              }}
            > Câu chuyện bánh ngọt </h3>

            <LinesEllipsis
              text={text}
              maxLine='4' // Số dòng tối đa
              ellipsis='...'
              trimRight
              basedOn='words'
              style={{
                fontSize: 16,
                marginLeft: 45,
                marginRight: 45,
                marginTop: 20,
                marginBottom: 25,
                color: '#3A060E'
              }}
            />
            <div>
              <a
                style={{
                  color: "#3A060E",
                  textAlign: "center",
                  marginTop: "80px",
                  fontSize: "16px",
                  fontStyle: 'italic',
                  textDecoration: 'underline',
                  marginLeft: 45,
                  cursor: 'pointer'
                }}
              >Xem thêm </a>
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 50 }}>
        <h1
          style={{
            color: "#3A060E",
            textAlign: "center",
            marginTop: "80px",
            fontSize: "4rem",
            paddingBottom: 10,
            fontWeight: 700
          }}
        >TIN TỨC </h1>
        <h3
          style={{
            color: "#3A060E",
            textAlign: "center",
            fontSize: "16px ",
            paddingBottom: 25
          }}>Cập nhật thông tin mới nhất về các hoạt động của Avocado</h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', marginLeft: '137px', marginRight: '137px', gap: '25px', paddingBottom: 25 }}>
          <CardNews img={news} title={'Giáng sinh cùng Avocado: Bánh kem Strawberry Cream giảm giá 10%'} detail={'Hòa vào không khí Giáng sinh, Avocado gửi đến khách hàng nhiều ưu đãi hấp dẫn: Giảm giá 10% cho sản phẩm Strawberry Cream từ 12/12-25/12/2024'}> </CardNews>
          <CardNews img={news} title={'Giáng sinh cùng Avocado: Bánh kem Strawberry Cream giảm giá 10%'} detail={'Hòa vào không khí Giáng sinh, Avocado gửi đến khách hàng nhiều ưu đãi hấp dẫn: Giảm giá 10% cho sản phẩm Strawberry Cream từ 12/12-25/12/2024'}> </CardNews>
          <CardNews img={news} title={'Giáng sinh cùng Avocado: Bánh kem Strawberry Cream giảm giá 10%'} detail={'Hòa vào không khí Giáng sinh, Avocado gửi đến khách hàng nhiều ưu đãi hấp dẫn: Giảm giá 10% cho sản phẩm Strawberry Cream từ 12/12-25/12/2024'}> </CardNews>
        </div>
        <div style={{
          marginBottom: 50,
        }}>
          <ButtonComponent
            onClick={()=> handleClick('/news')}
            style={{
              margin: 'auto'
      }}>Xem thêm </ButtonComponent>
        </div>
      </div>
    </div>
  )
}

export default HomePage