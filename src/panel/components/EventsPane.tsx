import classNames from "classnames";
import React, { useState } from "react";
import clearSVG from "../resources/clear_black_24dp.svg";
import { useDispatch, useSelector } from "../modules/store";
import { actions } from "../modules/slice";
import { Checkbox } from "./Checkbox";
import { EventItem } from "./EventItem";

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
    <div className={classNames("w-full", { hidden: !props.show })}>
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
              <EventItem event={event} key={id} />
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
