"use client";

import React from "react";
import { useSearchParams } from "next/navigation";

const About = () => {
  const searchParams = useSearchParams();
  console.log(searchParams.get("data"));
  return <div>About</div>;
};
export default About;
