import React from "react";

const Button = ({ title }) => (
  <button
    onClick={() => console.log("Clicked from react")}
    style={{
      padding: "10px",
      backgroundColor: "green",
      color: "white",
      cursor: "pointer",
    }}
  >
    {title}
  </button>
);

Button.defaultProps = {
  title: "default",
};

export default Button;
