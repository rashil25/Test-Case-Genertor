import React from "react";
import "./input.css";

const Input = (props) => {
  const { name, label, value, onChange, type } = props;
  return (
    <label className="pure-material-textfield-standard">
      <input
        placeholder=" "
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        type={type || "number"}
      />
      <span>{label}</span>
    </label>
  );
};

export default Input;
