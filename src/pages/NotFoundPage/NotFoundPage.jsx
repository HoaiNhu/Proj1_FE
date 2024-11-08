import React from 'react'

import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import SearchBoxComponent from '../../components/SearchBoxComponent/SearchBoxComponent'

const NotFoundPage = () => {
  return (
    <div>
      <h1>This page is unavailable</h1>
      <ButtonComponent>Đăng nhập</ButtonComponent>
      <SearchBoxComponent></SearchBoxComponent>
    </div>
  )
}

export default NotFoundPage