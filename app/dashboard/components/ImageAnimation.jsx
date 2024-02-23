"use client";

import React, { useState } from "react";
import Image from "next/image";

const ImageAnimation = ({ plainImage = "", animatedImage = "" }) => {
  const [isHovering, setIsHovered] = useState(false);
  const onMouseEnter = () => setIsHovered(true);
  const onMouseLeave = () => setIsHovered(false);

  return (
    <div
      className="w-fit"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <Image
        src={isHovering ? animatedImage : plainImage}
        height={30}
        alt={"image-icon"}
      />
    </div>
  );
};

export default ImageAnimation;
