import FormComponent from "../../../../components/FormComponent/FormComponent";
import SideMenuComponent from "../../../../components/SideMenuComponent/SideMenuComponent";
import ButtonComponent from "../../../../components/ButtonComponent/ButtonComponent";
import "./UpdateCategoryPage.css";

const UpdateCategoryPage = () => {

  return (
    <div>
      <div className="container-xl">
        <div className="update-category__container">
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

          <div className="update-category__content">
            <div className="status__info">
          
              <div className="update_category__title">
                <label>Sửa loại bánh</label>
              </div>
           
              <div className="content">
                <div className="content__item">
                  <label className="id__title">Mã loại bánh</label>
                  <FormComponent placeholder="C6"></FormComponent>
                </div>
                <div className="content__item" style={{ position: 'relative' }}>
                  <label className="name__title">Tên loại bánh</label>
                    <span 
                        className="material-icons" 
                        style={{ 
                        fontSize: '26px',
                        marginRight: "45px",
                        position: 'absolute', 
                        top: '0', 
                        right: '0', 
                        cursor: 'pointer' 
                        }}
                    >edit
                  </span>
                  <FormComponent placeholder="Bánh mùa đông"></FormComponent>
                </div>
              </div>

              {/* button */}
              <div className="btn__update-category">
                <ButtonComponent>Lưu</ButtonComponent>
                <ButtonComponent>Thoát</ButtonComponent>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateCategoryPage;
