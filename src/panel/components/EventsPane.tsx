import classNames from "classnames";
import React, { useState } from "react";
import clearSVG from "../resources/clear_black_24dp.svg";
import { useDispatch, useSelector } from "../modules/store";
import { actions } from "../modules/slice";
import { Checkbox } from "./Checkbox";

const getDateString = (timestamp: number) => {
  const date = new Date(timestamp);
  const hours = `${date.getHours()}`.padStart(2, "0");
  const minutes = `${date.getMinutes()}`.padStart(2, "0");
  const seconds = `${date.getSeconds()}`.padStart(2, "0");
  const milliseconds = `${date.getMilliseconds()}`.padEnd(3, "0");
  return `${hours}:${minutes}:${seconds}.${milliseconds}`;
};

export const EventsPane: React.FC<{ show: boolean }> = (props) => {
  const [hideGoogEvents, setHideGoogEvents] = useState(true);

  const dispatch = useDispatch();

  const events = useSelector((state) =>
    state.panel.events
      .slice()
      .filter((e) => !hideGoogEvents || !e.event.moduleName.match(/^goog\./))
      .reverse()
  );

  const handleClear = () => {
    dispatch(actions.clearDispatchedEvents());
  };

  const handleHideGoogEvents = () => {
    setHideGoogEvents(!hideGoogEvents);
  };

  return (
    <div className={classNames({ hidden: !props.show })}>
      <section className={classNames("fixed w-full bg-white h-[32px] items-center z-50 flex justify-between")}>
        <button type="button" onClick={handleClear} className={classNames("rounded-full border cursor-pointer m-1 p-0.5 transition-all")}>
          <img src={clearSVG} className="object-contain w-[16px]" />
        </button>

        <Checkbox label={'Hide "goog.*" events'} onChange={handleHideGoogEvents} checked={hideGoogEvents} />
      </section>

      <section className="pt-[32px]">
        {events.length ? (
          <>
            {events.map(({ id, event }) => (
              <div className="border-b font-mono p-1" key={id}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-sm">{event.moduleName}</span>
                    <span className="rounded text-white bg-red-400 text-[10px] px-1 py-0.5 ml-2 font-bold">{event.eventName}</span>
                  </div>
                  <span className="text-[10px] text-gray-700">{getDateString(event.timestamp)}</span>
                </div>
                <div className="text-[10px] text-gray-700">{event.eventDetail}</div>
              </div>
            ))}
          </>
        ) : (
          <div className="w-full h-20 flex items-center justify-center text-gray-400 font-bold">
            "dispatchEvent" has not been called yet.
          </div>
        )}
      </section>
    </div>
  );
};
