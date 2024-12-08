import FormComponent from "../../../../components/FormComponent/FormComponent";
import SideMenuComponent from "../../../../components/SideMenuComponent/SideMenuComponent";
import ButtonComponent from "../../../../components/ButtonComponent/ButtonComponent";
import "./AddCategoryPage.css";

const AddCategoryPage = () => {

  return (
    <div>
      <div className="container-xl">
        <div className="add-category__container">
          {/* side menu */}
          <div className="side-menu__category">
            <SideMenuComponent>Thông tin cửa hàng</SideMenuComponent>
            <SideMenuComponent>Đơn hàng</SideMenuComponent>
            <SideMenuComponent>Khuyến mãi</SideMenuComponent>
            <SideMenuComponent>Trạng thái</SideMenuComponent>
            <SideMenuComponent>Loại sản phẩm </SideMenuComponent>
            <SideMenuComponent>Danh sách người dùng</SideMenuComponent>
            <SideMenuComponent>Thống kê</SideMenuComponent>
          </div>

          <iv className="add-category__content">
            <div className="category__info">
          
              <div className="add_category__title">
                <label>Thêm loại bánh</label>
              </div>
           
              <div className="content">
                <div className="content__item">
                  <label className="id__title">Mã loại bánh</label>
                  <FormComponent placeholder="C6"></FormComponent>
                </div>
                <div className="content__item">
  <label className="name__title">
    Tên loại bánh <i className="fas fa-pencil-alt" style={{ marginLeft: '5px' }}></i>
  </label>
  <FormComponent placeholder="Bánh mùa đông"></FormComponent>
</div>

              </div>

              {/* button */}
              <div className="btn__add-category">
                <ButtonComponent>Thêm</ButtonComponent>
                <ButtonComponent>Thoát</ButtonComponent>
              </div>
            </div>
          </iv>
        </div>
      </div>
    </div>
  );
};

export default AddCategoryPage;
