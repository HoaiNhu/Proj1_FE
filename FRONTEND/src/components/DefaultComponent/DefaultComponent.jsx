import React from "react";

function DefaultComponent({children}) {
  return (
    <div>
      <HeaderComponent />
      {children}
    </div>
  );
}

export default DefaultComponent;
