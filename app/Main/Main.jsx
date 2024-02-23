"use client";
import Link from "next/link";
import React, { useState } from "react";

function MainC() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <span>{count}</span>
    </div>
  );
}

export default MainC;
