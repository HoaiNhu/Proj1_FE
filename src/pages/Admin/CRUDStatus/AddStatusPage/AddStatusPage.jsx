import FormComponent from "../../../../components/FormComponent/FormComponent";
import SideMenuComponent from "../../../../components/SideMenuComponent/SideMenuComponent";
import ButtonComponent from "../../../../components/ButtonComponent/ButtonComponent";
import "./AddStatusPage.css";

const AddStatusPage = () => {

  return (
    <div>
      <div className="container-xl">
        <div className="add-status__container">
          {/* side menu */}
          <div className="side-menu__status">
            <SideMenuComponent>Thông tin cửa hàng</SideMenuComponent>
            <SideMenuComponent>Đơn hàng</SideMenuComponent>
            <SideMenuComponent>Khuyến mãi</SideMenuComponent>
            <SideMenuComponent>Trạng thái</SideMenuComponent>
            <SideMenuComponent>Loại sản phẩm </SideMenuComponent>
            <SideMenuComponent>Danh sách người dùng</SideMenuComponent>
            <SideMenuComponent>Thống kê</SideMenuComponent>
          </div>

          <iv className="add-status__content">
            <div className="status__info">
          
              <div className="add_status__title">
                <label>Thêm trạng thái</label>
              </div>
           
              <div className="content">
                <div className="content__item">
                  <label className="id__title">Mã trạng thái</label>
                  <FormComponent placeholder="S5"></FormComponent>
                </div>
                <div className="content__item">
                  <label className="name__title">Tên trạng thái</label>
                  <FormComponent placeholder="Đã đánh giá"></FormComponent>
                </div>
              </div>

              {/* button */}
              <div className="btn__add-status">
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

export default AddStatusPage;
