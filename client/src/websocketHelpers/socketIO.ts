import { CanvasType } from "../Types/global";

export type drawFnProp = (canvas: CanvasType) => void;

export const drawInitialCanvas = (socket: any, drawFN: drawFnProp) => {
  // get and draw current canvas from server
  socket.emit("load-InitialCanvas");
  socket.on("receive-InitialCanvas", drawFN);
};

export const listenForCanvasUpdates = (socket: any, drawFN: drawFnProp) => {
  // get pixel fill inputs from other clients
  socket.on("receive-updateCanvas", drawFN);
};

export const disconnectCanvasSockets = (socket: any) => {
  socket.off("receive-InitialData");
  socket.off("receive-updateCanvas");
};
