import React from "react";

export default function SearchInput({ type, placeholder, handle }) {
  return (
    <form className="input">
      <input type={type} placeholder={placeholder} onChange={handle} />
    </form>
  );
}
