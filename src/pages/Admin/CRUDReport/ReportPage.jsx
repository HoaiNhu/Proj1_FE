import React, { useEffect, useState } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ButtonComponent from "../../../components/ButtonComponent/ButtonComponent";
import CheckboxComponent from "../../../components/CheckboxComponent/CheckboxComponent";
import SideMenuComponent_AdminManage from "../../../components/SideMenuComponent_AdminManage/SideMenuComponent_AdminManage";
import * as OrderService from "../../../services/OrderService";
import * as ProductService from "../../../services/productServices";
import "./ReportPage.css";

const ReportDropdown = ({
  title,
  options,
  selectedValue,
  onSelect,
  className,
}) => {
  const selectedLabel =
    selectedValue &&
    options.find((o) => o.value.toString() === selectedValue.toString())?.label;

  return (
    <DropdownButton
      title={selectedLabel || title}
      className={`custom-dropdown ${className}`}
      onSelect={(value) => onSelect(value)}
    >
      {options.map((option, index) => (
        <Dropdown.Item key={index} eventKey={option.value}>
          {option.label}
        </Dropdown.Item>
      ))}
    </DropdownButton>
  );
};

const ReportPage = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [statistics, setStatistics] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);

  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedTable, setSelectedTable] = useState("product");
  const [filteredOrders, setFilteredOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await OrderService.getAllOrders(token);
      console.log("responseOrder", response);
      setOrders(response.data || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await ProductService.getAllproduct();
      setProducts(response.data || []);
      console.log("responseProduct", response);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Sửa: calculateStatistics nhận ordersInput (mặc định là orders)
  const calculateStatistics = (ordersInput = orders) => {
    const productStats = {};

    let revenue = 0;
    let quantity = 0;

    ordersInput.forEach((order) => {
      revenue += order.totalPrice;

      order.orderItems.forEach((item) => {
        // Sửa: lấy id sản phẩm từ item.product._id
        const productId = item.product?._id;
        if (!productId) return;

        // Lấy thông tin sản phẩm từ item.product (ưu tiên) hoặc từ products (nếu cần)
        const product =
          item.product || products.find((p) => p._id === productId);
        if (!product) return;

        const itemRevenue = item.total;
        const itemQuantity = item.quantity;
        quantity += itemQuantity;

        if (!productStats[productId]) {
          productStats[productId] = {
            code: product._id,
            name: product.productName,
            price: product.productPrice,
            quantity: 0,
            total: 0,
          };
        }
        productStats[productId].quantity += itemQuantity;
        productStats[productId].total += itemRevenue;
      });
    });

    const statsArray = Object.values(productStats).map((stat) => ({
      ...stat,
      percentage:
        revenue > 0 ? ((stat.total / revenue) * 100).toFixed(2) + "%" : "0%",
      _id: stat.code, // Thêm _id để dùng làm key
    }));

    setStatistics(statsArray);
    setTotalRevenue(revenue);
    setTotalQuantity(quantity);
  };

  // Sửa: calculateOrderStatistics dùng filteredOrders
  const calculateOrderStatistics = () => {
    return filteredOrders.map((order, index) => ({
      stt: index + 1,
      orderCode: order.orderCode,
      totalProducts: order.orderItems.reduce(
        (sum, item) => sum + item.quantity,
        0
      ),
      orderDate: new Date(order.createdAt).toLocaleDateString(),
      completionDate: order.deliveryDate
        ? new Date(order.deliveryDate).toLocaleDateString()
        : "Chưa hoàn thành",
      totalPrice: order.totalPrice,
    }));
  };

  useEffect(() => {
    fetchOrders();
    fetchProducts();
  }, []);

  useEffect(() => {
    if (orders.length > 0 && products.length > 0) {
      setFilteredOrders(orders); // mặc định ban đầu là tất cả orders
      calculateStatistics(orders);
    }
  }, [orders, products]);

  // Khi filteredOrders thay đổi và đang ở bảng sản phẩm thì cập nhật statistics
  useEffect(() => {
    if (selectedTable === "product" && products.length > 0) {
      calculateStatistics(filteredOrders);
    }
    // eslint-disable-next-line
  }, [filteredOrders, selectedTable, products]);

  const toggleSelectRow = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  // Sửa: toggleSelectAll cho bảng sản phẩm dùng _id
  const toggleSelectAll = () => {
    if (selectedTable === "product") {
      setSelectedRows(
        selectedRows.length === statistics.length
          ? []
          : statistics.map((stat) => stat._id)
      );
    } else {
      setSelectedRows(
        selectedRows.length === filteredOrders.length
          ? []
          : filteredOrders.map((order) => order.orderCode)
      );
    }
  };

  const isSelected = (id) => selectedRows.includes(id);

  const days = Array.from({ length: 31 }, (_, i) => ({
    label: `Ngày ${i + 1}`,
    value: i + 1,
  }));

  const months = Array.from({ length: 12 }, (_, i) => ({
    label: `Tháng ${i + 1}`,
    value: i + 1,
  }));

  const years = Array.from({ length: 7 }, (_, i) => ({
    label: `Năm ${2020 + i}`,
    value: 2020 + i,
  }));

  const tables = [
    { label: "Bảng sản phẩm", value: "product" },
    { label: "Bảng đơn hàng", value: "order" },
  ];

  const handleView = () => {
    let filtered = [...orders];

    if (selectedDay) {
      filtered = filtered.filter(
        (order) =>
          new Date(order.createdAt).getDate() === parseInt(selectedDay, 10) ||
          (order.deliveryDate &&
            new Date(order.deliveryDate).getDate() ===
              parseInt(selectedDay, 10))
      );
    }
    if (selectedMonth) {
      filtered = filtered.filter(
        (order) =>
          new Date(order.createdAt).getMonth() + 1 ===
            parseInt(selectedMonth, 10) ||
          (order.deliveryDate &&
            new Date(order.deliveryDate).getMonth() + 1 ===
              parseInt(selectedMonth, 10))
      );
    }
    if (selectedYear) {
      filtered = filtered.filter(
        (order) =>
          new Date(order.createdAt).getFullYear() ===
            parseInt(selectedYear, 10) ||
          (order.deliveryDate &&
            new Date(order.deliveryDate).getFullYear() ===
              parseInt(selectedYear, 10))
      );
    }

    console.log("Filtered Orders:", filtered);
    console.log("Selected filters:", {
      selectedDay,
      selectedMonth,
      selectedYear,
      selectedTable,
    });

    setFilteredOrders(filtered);

    if (selectedTable === "order") {
      setOrders(filtered); // chỉ setOrders khi ở bảng đơn hàng
    }

    // Không gọi calculateStatistics ở đây nữa, đã có useEffect theo dõi filteredOrders
    // console.log("Filtered Orders:", filtered);
  };

  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("report");

  const handleTabClick = (tab, navigatePath) => {
    setActiveTab(tab);
    navigate(navigatePath);
  };

  return (
    <div>
      <div className="container-xl">
        <div className="report-list__info">
          {/* side menu */}
          <div className="side-menu__report">
            <SideMenuComponent_AdminManage
              activeTab={activeTab}
              handleTabClick={handleTabClick}
            />
          </div>

          <div className="report-list__content">
            <div className="report-list__action">
              <div className="report-dropdown-container">
                <ReportDropdown
                  title="Chọn ngày"
                  options={days}
                  selectedValue={selectedDay}
                  onSelect={(value) => setSelectedDay(value)}
                  className="report-dropdown"
                />
                <ReportDropdown
                  title="Chọn tháng"
                  options={months}
                  selectedValue={selectedMonth}
                  onSelect={(value) => setSelectedMonth(value)}
                  className="report-dropdown"
                />
                <ReportDropdown
                  title="Chọn năm"
                  options={years}
                  selectedValue={selectedYear}
                  onSelect={(value) => setSelectedYear(value)}
                  className="report-dropdown"
                />
                <ReportDropdown
                  title="Chọn bảng"
                  options={tables}
                  selectedValue={selectedTable}
                  onSelect={(value) => setSelectedTable(value)}
                  className="report-dropdown"
                />
                <div className="btn__action">
                  <ButtonComponent className="btn-view" onClick={handleView}>
                    Xem
                  </ButtonComponent>
                </div>
              </div>
            </div>

            <div className="report-total-container">
              <div className="report-container">
                <div className="report-title">
                  <table>
                    <tr>
                      <th>TỔNG DOANH THU</th>
                    </tr>
                  </table>
                </div>

                <div className="report-data">
                  <table>
                    <tr>
                      <td>{totalRevenue.toLocaleString()}</td>
                    </tr>
                  </table>
                </div>
              </div>

              <div className="report-container">
                <div className="report-title">
                  <table>
                    <tr>
                      <th>TỔNG SẢN PHẨM BÁN RA</th>
                    </tr>
                  </table>
                </div>

                <div className="report-data">
                  <table>
                    <tr>
                      <td>{totalQuantity}</td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>

            {/* table thống kê theo sản phẩm */}
            <div className="table-container">
              <h3 style={{ padding: "10px 20px" }}>Thống kê theo sản phẩm</h3>
              <table className="promo-table">
                <thead>
                  <tr>
                    <th>
                      <CheckboxComponent
                        isChecked={selectedRows.length === statistics.length}
                        onChange={toggleSelectAll}
                      />
                    </th>
                    <th>STT</th>
                    <th>Mã sản phẩm</th>
                    <th>Tên sản phẩm</th>
                    <th>Đơn giá</th>
                    <th>Số lượng</th>
                    <th>Tổng thu</th>
                    <th>Tỉ lệ</th>
                  </tr>
                </thead>
                <tbody>
                  {statistics.map((stat, index) => (
                    <tr
                      key={stat._id}
                      className={isSelected(stat._id) ? "highlight" : ""}
                    >
                      <td>
                        <CheckboxComponent
                          isChecked={isSelected(stat._id)}
                          onChange={() => toggleSelectRow(stat._id)}
                        />
                      </td>
                      <td>{index + 1}</td>
                      <td>{stat.code}</td>
                      <td>{stat.name}</td>
                      <td>{stat.price}</td>
                      <td>{stat.quantity}</td>
                      <td>{stat.total}</td>
                      <td>{stat.percentage}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Bảng thống kê theo đơn hàng */}
            <div className="table-container">
              <h3 style={{ padding: "10px 20px" }}>Thống kê theo đơn hàng</h3>
              <table className="promo-table">
                <thead>
                  <tr>
                    <th>
                      <CheckboxComponent
                        isChecked={
                          selectedRows.length === filteredOrders.length
                        }
                        onChange={toggleSelectAll}
                      />
                    </th>
                    <th>STT</th>
                    <th>Mã đơn</th>
                    <th>Tổng sản phẩm</th>
                    <th>Thời gian đặt</th>
                    <th>Thời gian hoàn thành</th>
                    <th>Tổng tiền</th>
                  </tr>
                </thead>
                <tbody>
                  {calculateOrderStatistics().map((order) => (
                    <tr key={order.orderCode}>
                      <td>
                        <CheckboxComponent
                          isChecked={isSelected(order.orderCode)}
                          onChange={() => toggleSelectRow(order.orderCode)}
                        />
                      </td>
                      <td>{order.stt}</td>
                      <td>{order.orderCode}</td>
                      <td>{order.totalProducts}</td>
                      <td>{order.orderDate}</td>
                      <td>{order.completionDate}</td>
                      <td>{order.totalPrice.toLocaleString()} VND</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportPage;
