import { useEffect, useState } from "react";

export const useRenderState = () => {
  const [isRendering, setIsRendering] = useState(true);
  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsRendering(false);
    }, 10);
  }, []);

  useEffect(() => {
    if (!isRendering) {
      setTimeout(() => {
        setIsRendered(true);
      }, 10);
    }
  }, [isRendering]);

  const renderStateClassObject = {
    "bg-red-100": isRendering,
    "duration-100": isRendered,
    "duration-1000": !isRendered,
  };

  return { renderStateClassObject };
};
