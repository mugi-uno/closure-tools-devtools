import classNames from "classnames";
import React from "react";
import { useDispatch, useSelector } from "../modules/store";

export const EventsPane: React.FC<{ show: boolean }> = (props) => {
  const dispatch = useDispatch();

  const events = useSelector((state) =>
    state.panel.events
      .slice()
      .filter((e) => !e.moduleName.match(/^goog\./))
      .reverse()
  );

  return (
    <div className={classNames({ hidden: !props.show })}>
      <section>
        {events.map((event) => (
          <div className="border-b font-mono p-2">
            <div className="flex items-center">
              <span className="text-sm">{event.moduleName}</span>
              <span className="rounded text-white bg-red-400 text-xs p-1 ml-2">{event.eventName}</span>
            </div>
            <div>{event.eventDetail}</div>
          </div>
        ))}
      </section>
    </div>
  );
};
