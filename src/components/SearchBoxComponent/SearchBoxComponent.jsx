import React from "react";
import "../../assets/css/style.css";
import "../../assets/css/reset.css";
import styles from "./SearchBoxComponent.module.css";

const SearchBoxComponent = () => {
  return (
    <div>
      <input
        className={styles.search__component}
        type="search"
        placeholder="Nhập tên sản phẩm..."
        aria-label="Search"
      ></input>
    </div>
  );
};

export default SearchBoxComponent;
