import React from "react";

export const calculatePixelPosition = (x, y, pixelLength) => {
  // get nearest rounded number
  const pixelX = Math.floor(x / pixelLength);
  const pixelY = Math.floor(y / pixelLength);

  // scale up the pixel
  const scaledX = pixelX * pixelLength;
  const scaledY = pixelY * pixelLength;
  return { scaledX, scaledY };
};
