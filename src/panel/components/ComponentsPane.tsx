import classNames from "classnames";
import React, { useEffect } from "react";
import { postMessage } from "../../port";
import { actions } from "../modules/slice";
import { useDispatch, useSelector } from "../modules/store";
import searchSVG from "../resources/search_black_24dp.svg";
import { ClosureComponentTree } from "./ClosureComponentTree";

export const ComponentsPane: React.FC = () => {
  const dispatch = useDispatch();

  const components = useSelector((state) => state.panel.components);
  const highlightEnabled = useSelector((state) => state.panel.highlightEnabled);

  useEffect(() => {
    postMessage({ type: "SCAN_COMPONENTS" });
  }, []);

  const handleHighlightButton = () => {
    if (highlightEnabled) {
      dispatch(actions.disableHighlight());
    } else {
      dispatch(actions.enableHighlight());
    }
  };

  return (
    <>
      <section className="fixed w-full bg-white h-[32px] flex items-center z-50">
        <button
          type="button"
          onClick={handleHighlightButton}
          className={classNames("rounded-full border cursor-pointer m-1 p-0.5 transition-all", {
            "border-red-400 bg-yellow-50": highlightEnabled,
          })}
        >
          <img src={searchSVG} className="object-contain w-[16px]" />
        </button>
      </section>
      <section className="pt-[32px]">
        <ClosureComponentTree components={components} depth={1} />
      </section>
    </>
  );
};
