// src/components/button.js
import React from "react";

export default function Button({ children, ...buttonProps }) {
  return (
    <button
      className=" p-4 rounded bg-white text-purple-800 text-xl font-semibold uppercase shadow hover:shadow-lg focus:outline-none focus:bg-gray-800"
      {...buttonProps}
    >
      {children}
    </button>
  );
}