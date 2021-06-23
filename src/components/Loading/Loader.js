import React from "react";
import classes from "./Loader.module.scss";
export default function Ring({ color, size, style }) {
  const circles = [...Array(4)].map((_, index) => {
    return (
      <div
        key={index}
        style={{
          borderColor: `${color} transparent transparent transparent`,
          width: size * 0.8,
          height: size * 0.8,
          margin: size * 0.1,
          borderWidth: size * 0.1,
        }}
      ></div>
    );
  });

  return (
    <div
      className={classes.ring}
      style={{ width: size, height: size, ...style }}
    >
      {circles}
    </div>
  );
}
