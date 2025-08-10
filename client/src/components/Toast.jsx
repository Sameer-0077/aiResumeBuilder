import React, { useEffect } from "react";

const Toast = ({ message, onClose, error }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(); // hide toast after 1.5 sec
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`fixed top-5 left-1/2 z-50 -translate-x-1/2 rounded-md px-6 py-3 text-white shadow-lg animate-slideDown ${
        error ? `bg-rose-500` : `bg-green-500`
      }`}
    >
      {message}
    </div>
  );
};

export default Toast;
