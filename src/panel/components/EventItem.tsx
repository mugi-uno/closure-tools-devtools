import classNames from "classnames";
import React from "react";
import { EventDispatchEventObject } from "../../types";
import { useRenderState } from "../hooks/useRenderState";

const getDateString = (timestamp: number) => {
  const date = new Date(timestamp);
  const hours = `${date.getHours()}`.padStart(2, "0");
  const minutes = `${date.getMinutes()}`.padStart(2, "0");
  const seconds = `${date.getSeconds()}`.padStart(2, "0");
  const milliseconds = `${date.getMilliseconds()}`.padEnd(3, "0");
  return `${hours}:${minutes}:${seconds}.${milliseconds}`;
};

export const EventItem: React.FC<{ event: EventDispatchEventObject }> = ({ event }) => {
  const { renderStateClassObject } = useRenderState();

  return (
    <div className={classNames("border-b font-mono p-1", renderStateClassObject)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-sm">{event.moduleName}</span>
          <span className="rounded text-white bg-red-400 text-[10px] px-1 py-0.5 ml-2 font-bold">{event.eventName}</span>
        </div>
        <span className="text-[10px] text-gray-700">{getDateString(event.timestamp)}</span>
      </div>
      <div className="text-[10px] text-gray-700">{event.eventDetail}</div>
    </div>
  );
};
