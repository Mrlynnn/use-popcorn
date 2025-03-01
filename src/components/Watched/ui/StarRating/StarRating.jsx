import React, { useState } from "react";
import { Star } from "./Star";

export function StarRating({ rating, setRating }) {
  const [tempRating, setTempRating] = useState(rating);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "16px",
      }}
    >
      <div
        style={{
          display: "flex",
        }}
      >
        {Array.from({ length: 10 }, (_, ind) => (
          <Star
            key={ind}
            ind={ind}
            fill={ind < tempRating || ind < rating ? "gold" : "transparent"}
            onHover={setTempRating}
            onMark={setRating}
          />
        ))}
      </div>
      <span
        style={{
          verticalAlign: "5px",
          color: "white",
        }}
      >
        {tempRating || rating}/10
      </span>
    </div>
  );
}
