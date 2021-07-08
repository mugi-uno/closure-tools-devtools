import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { postMessage } from "../../port";
import { actions } from "../modules/slice";
import { useDispatch, useSelector } from "../modules/store";
import { ClosureComponentTree } from "./ClosureComponentTree";
import searchSVG from "../resources/search_black_24dp.svg";
import refreshSVG from "../resources/refresh_black_24dp.svg";
import { Checkbox } from "./Checkbox";

export const ComponentsPane: React.FC<{ show: boolean }> = (props) => {
  const dispatch = useDispatch();

  const [autoRefresh, setAutoRefresh] = useState(true);
  const components = useSelector((state) => state.panel.components);
  const highlightEnabled = useSelector((state) => state.panel.highlightEnabled);

  useEffect(() => {
    const refreshInterval = setInterval(() => {
      if (autoRefresh && props.show) {
        postMessage({ type: "SCAN_COMPONENTS" });
      }
    }, 3000);

    return () => clearInterval(refreshInterval);
  }, [autoRefresh, props.show]);

  const handleHighlightButton = () => {
    if (highlightEnabled) {
      dispatch(actions.disableHighlight());
    } else {
      dispatch(actions.enableHighlight());
    }
  };

  const handleRefresh = () => {
    dispatch(actions.disableHighlight());
    postMessage({ type: "SCAN_COMPONENTS" });
  };

  return (
    <div className={classNames({ hidden: !props.show })}>
      <section className={classNames("fixed w-full bg-white h-[32px] justify-between items-center z-50 flex")}>
        <div>
          <button
            type="button"
            onClick={handleHighlightButton}
            className={classNames("rounded-full border cursor-pointer m-1 p-0.5 transition-all", {
              "border-red-400 bg-yellow-50": highlightEnabled,
            })}
          >
            <img src={searchSVG} className="object-contain w-[16px]" />
          </button>
          <button
            type="button"
            onClick={handleRefresh}
            className={classNames("rounded-full border cursor-pointer m-1 p-0.5 transition-all ml-2")}
          >
            <img src={refreshSVG} className="object-contain w-[16px]" />
          </button>
        </div>

        <Checkbox
          label={"Auto refresh"}
          onChange={() => {
            setAutoRefresh(!autoRefresh);
          }}
          checked={autoRefresh}
          className="pr-2"
        />
      </section>
      <section className="pt-[32px]">
        <ClosureComponentTree components={components} depth={1} />
      </section>
    </div>
  );
};
