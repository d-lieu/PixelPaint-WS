import React, { useEffect, useRef, useContext, useState } from "react";
import { UserContext } from "../../hooks/UserContext";
import { calculatePixelPosition } from "../../utils/calculatePixelPosition";
import { Box } from "@mui/material";
import {
  disconnectCanvasSockets,
  drawInitialCanvas,
  listenForCanvasUpdates,
} from "../../websocketHelpers/socketIO";
import {
  CurrentDrawStroke,
  fillGridOfPixelsProps,
  fillSinglePixelProps,
  CanvasType,
} from "../../Types/global";

export default function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const { user, socket } = useContext(UserContext);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const pixelLength = 25;

  const fillSinglePixel = ({ x, y, color }: fillSinglePixelProps) => {
    if (!contextRef.current) return;
    contextRef.current.fillStyle = color;
    contextRef.current.fillRect(x, y, pixelLength, pixelLength);
  };

  const fillGridOfPixels = ({
    x,
    y,
    color,
    gridSize,
  }: fillGridOfPixelsProps) => {
    if (!contextRef.current) return;

    const halfGridSize = Math.floor(gridSize / 2);

    contextRef.current.fillStyle = color;

    let currentDrawStroke: Record<string, CurrentDrawStroke> = {};

    // Loop through the grid of pixels and fill each one
    for (let i = -halfGridSize; i <= halfGridSize; i++) {
      for (let j = -halfGridSize; j <= halfGridSize; j++) {
        let newX = x + i * pixelLength;
        let newY = y + j * pixelLength;
        contextRef.current.fillRect(newX, newY, pixelLength, pixelLength);
        currentDrawStroke[`${newX}-${newY}`] = { x: newX, y: newY, color };
      }
    }

    // Emit all canvas data only once for performance
    socket.emit("send-updateCanvas", currentDrawStroke);
  };

  const getCanvasContext = () => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;

    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    contextRef.current = canvas.getContext("2d");
  };

  const drawCanvas = (canvas: CanvasType) => {
    Object.values(canvas).forEach((pixel) => {
      fillSinglePixel({
        x: pixel.x,
        y: pixel.y,
        color: pixel.color,
      });
    });
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    handleDraw(e);
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    handleDraw(e);
  };

  const handleDraw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;
    const canvasBoundingRect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - canvasBoundingRect.left;
    const y = e.clientY - canvasBoundingRect.top;

    const { scaledX, scaledY } = calculatePixelPosition({
      x,
      y,
      pixelLength,
    });

    fillGridOfPixels({
      x: scaledX,
      y: scaledY,
      color: user.color,
      gridSize: user.gridSize,
    });
  };

  const handleInitialCanvas = () => {
    if (socket == null) return;
    drawInitialCanvas(socket, drawCanvas);
    listenForCanvasUpdates(socket, drawCanvas);

    return () => disconnectCanvasSockets(socket);
  };

  useEffect(getCanvasContext, [canvasRef]);
  useEffect(handleInitialCanvas, [socket]);

  return (
    <Box
      my={2}
      sx={{
        border: "1px solid #bbb",
        display: "inline-flex",
        position: "relative",
      }}
    >
      <canvas
        width={window.innerWidth}
        height={window.innerHeight}
        ref={canvasRef}
        onMouseDownCapture={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      />
    </Box>
  );
}
