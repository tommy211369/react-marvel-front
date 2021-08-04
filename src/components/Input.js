import React from "react";

export default function Input({ type, placeholder, handle }) {
  return (
    <form className="input">
      <input type={type} placeholder={placeholder} onChange={handle} />
    </form>
  );
}
