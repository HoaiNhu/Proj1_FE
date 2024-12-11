import React, { useEffect, useState } from "react";

const Loading = ({ children, isLoading, delay = 200 }) => {
  const [showSpinner, setShowSpinner] = useState(false);

  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => {
        setShowSpinner(true);
      }, delay);
      return () => clearTimeout(timer);
    } else {
      setShowSpinner(false);
    }
  }, [isLoading, delay]);

  return (
    <>
      {isLoading && showSpinner ? (
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        children
      )}
    </>
  );
};

export default Loading;