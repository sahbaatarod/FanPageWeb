import React from "react";
import classes from "./Input.module.scss";
function Input({
  width,
  height,
  icon,
  deleteIcon,
  borderRadius,
  dir,
  resetValue,
  value,
  setValue,
  styleClass,
  mobileWidth,
  border,
  background,
  btn,
  placeholder,
  onBlur,
}) {
  const handleWidth = () => {
    if (typeof window !== "undefined") {
      if (mobileWidth) {
        if (window.innerWidth < 600) {
          return mobileWidth;
        } else {
          return width;
        }
      } else {
        return width;
      }
    }
  };
  const getWidth = handleWidth();
  return (
    <div
      className={styleClass}
      style={{
        borderRadius: borderRadius,
        width: getWidth,
        border: border,
        background: background,
        display: "flex",
        alignItems: "center",
        transition: "all 0.2s",
        height: height,
      }}
    >
      {icon && dir === "ltr" && (
        <img
          src={icon}
          alt="icon"
          style={{ width: "17px", marginLeft: ".5em" }}
        ></img>
      )}
      {btn && dir === "rtl" && btn}
      {deleteIcon && dir === "rtl" && value.length > 0 && (
        <button
          style={{
            border: "none",
            outline: "none",
            background: "none",
          }}
          onClick={resetValue}
        >
          {deleteIcon}
        </button>
      )}
      <input
        placeholder={placeholder}
        value={value}
        onChange={setValue}
        onBlur={onBlur}
        dir={dir}
        className={classes.inputOne}
        type="text"
      ></input>
      {btn && dir === "ltr" && btn}
      {deleteIcon && dir === "ltr" && value.length > 0 && (
        <button
          style={{
            border: "none",
            outline: "none",
            background: "none",
            marginBottom: ".2em",
          }}
          onClick={resetValue}
        >
          {deleteIcon}
        </button>
      )}
      {icon && dir === "rtl" && (
        <img
          src={icon}
          alt="icon"
          style={{ width: "24px", marginRight: ".5em" }}
        ></img>
      )}
    </div>
  );
}

export default Input;
