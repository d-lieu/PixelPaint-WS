import React, { useEffect, useRef, useContext } from "react";
import { UserContext } from "../hooks/UserContext";
import { calculatePixelPosition } from "../utils/calculatePixelPosition";

export default function Canvas() {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const { user, socket } = useContext(UserContext);
  const pixelLength = 25;

  const fillPixel = (x, y, color) => {
    contextRef.current.fillStyle = color;
    contextRef.current.fillRect(x, y, pixelLength, pixelLength);
  };

  const getCanvasContext = () => {
    const canvas = canvasRef.current;

    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    contextRef.current = canvas.getContext("2d");
  };

  const drawCanvas = (canvas) => {
    Object.values(canvas).forEach((pixel) => {
      fillPixel(pixel.x, pixel.y, pixel.color);
    });
  };

  const handleInitialCanvas = () => {
    if (socket == null) return;
    // get and draw current canvas from server
    socket.emit("load-InitialCanvas");
    socket.on("receive-InitialCanvas", drawCanvas);

    // get pixel fill inputs from other clients
    socket.on("receive-fillPixel", fillPixel);
    return () => {
      socket.off("receive-fillPixel");
      socket.off("receive-InitialData");
    };
  };

  useEffect(getCanvasContext, [canvasRef]);
  useEffect(handleInitialCanvas, [socket]);

  const handleCanvasClick = (e) => {
    // get the mouse position
    const canvasBoundingRect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - canvasBoundingRect.left;
    const y = e.clientY - canvasBoundingRect.top;

    const { scaledX, scaledY } = calculatePixelPosition(x, y, pixelLength);
    fillPixel(scaledX, scaledY, user.color);

    // emit fill pixel to websocket
    socket.emit("send-fillPixel", {
      x: scaledX,
      y: scaledY,
      color: user.color,
    });
  };

  return (
    <canvas
      width={window.innerWidth}
      height={window.innerHeight}
      onClick={handleCanvasClick}
      ref={canvasRef}
    />
  );
}
