import { MouseEventHandler, TouchEventHandler, useEffect, useState } from "react";

export const useSplitPane = () => {
  const [leftSize, setLeftSize] = useState(500);
  const [positionX, setPositionX] = useState<number | null>(null);

  const resizeStart = (x: number) => {
    setPositionX(x);
  };

  const resize = (x: number) => {
    if (positionX === null) return;
    setLeftSize(leftSize + (x - positionX));
    setPositionX(x);
  };

  const resizeEnd = () => {
    setPositionX(null);
  };

  const splitPaneHandlers: {
    onMouseMove: MouseEventHandler;
    onTouchMove: TouchEventHandler;
    onMouseUp: MouseEventHandler;
    onMouseLeave: MouseEventHandler;
  } = {
    onMouseMove(event) {
      resize(event.clientX);
    },
    onTouchMove(event) {
      resize(event.touches[0].clientX);
    },
    onMouseUp(_) {
      resizeEnd();
    },
    onMouseLeave(_) {
      resizeEnd();
    },
  };

  const adjustBarHandlers: {
    onMouseDown: MouseEventHandler;
    onTouchStart: TouchEventHandler;
  } = {
    onMouseDown(event) {
      resizeStart(event.clientX);
    },
    onTouchStart(event) {
      resizeStart(event.touches[0].clientX);
    },
  };

  return { splitPaneHandlers, adjustBarHandlers, leftSize };
};
