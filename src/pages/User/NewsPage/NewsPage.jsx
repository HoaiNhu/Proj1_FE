import React from 'react'
import CardNews from '../../../components/CardNews/CardNews'
import news from '../../../assets/img/news.jpg'
import './NewsPage.css'
import '../../../components/SideMenuComponent/SideMenuComponent'
import SideMenuComponent from '../../../components/SideMenuComponent/SideMenuComponent'
const NewsPage = () => {
  return (
    <div>
      <h1 className='h1'
      style={{
        fontSize:'36px',
        marginTop:'50px'
      }} >TIN TỨC</h1>
      <div className='container-xl' 
      style={{
        display:'flex'
      }}>
      <div className='list'
      style={{
        display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '80px', paddingBottom: 25, marginTop: 50
      }}>
        <CardNews img={news} title={'Giáng sinh cùng Avocado: Bánh kem Strawberry Cream giảm giá 10%'} detail={'Hòa vào không khí Giáng sinh, Avocado gửi đến khách hàng nhiều ưu đãi hấp dẫn: Giảm giá 10% cho sản phẩm Strawberry Cream từ 12/12-25/12/2024'}> </CardNews>
        <CardNews img={news} title={'Giáng sinh cùng Avocado: Bánh kem Strawberry Cream giảm giá 10%'} detail={'Hòa vào không khí Giáng sinh, Avocado gửi đến khách hàng nhiều ưu đãi hấp dẫn: Giảm giá 10% cho sản phẩm Strawberry Cream từ 12/12-25/12/2024'}> </CardNews>
        <CardNews img={news} title={'Giáng sinh cùng Avocado: Bánh kem Strawberry Cream giảm giá 10%'} detail={'Hòa vào không khí Giáng sinh, Avocado gửi đến khách hàng nhiều ưu đãi hấp dẫn: Giảm giá 10% cho sản phẩm Strawberry Cream từ 12/12-25/12/2024'}> </CardNews>
        <CardNews img={news} title={'Giáng sinh cùng Avocado: Bánh kem Strawberry Cream giảm giá 10%'} detail={'Hòa vào không khí Giáng sinh, Avocado gửi đến khách hàng nhiều ưu đãi hấp dẫn: Giảm giá 10% cho sản phẩm Strawberry Cream từ 12/12-25/12/2024'}> </CardNews>
        <CardNews img={news} title={'Giáng sinh cùng Avocado: Bánh kem Strawberry Cream giảm giá 10%'} detail={'Hòa vào không khí Giáng sinh, Avocado gửi đến khách hàng nhiều ưu đãi hấp dẫn: Giảm giá 10% cho sản phẩm Strawberry Cream từ 12/12-25/12/2024'}> </CardNews>
        <CardNews img={news} title={'Giáng sinh cùng Avocado: Bánh kem Strawberry Cream giảm giá 10%'} detail={'Hòa vào không khí Giáng sinh, Avocado gửi đến khách hàng nhiều ưu đãi hấp dẫn: Giảm giá 10% cho sản phẩm Strawberry Cream từ 12/12-25/12/2024'}> </CardNews>
      </div>
      <div style={{display:'inline-flex', marginTop:50, marginLeft:120}}>
        <SideMenuComponent></SideMenuComponent>
      </div>
      </div>
    </div>
  )
}

export default NewsPage