import React, { useState } from "react";

export function Search({ onSearch }) {
  const [value, setValue] = useState("");

  function changeHandler(e) {
    setValue(e.target.value);
    onSearch(e.target.value);
  }

  return (
    <input
      onChange={changeHandler}
      value={value}
      className="search"
      type="text"
      placeholder="Search movies..."
    />
  );
}
