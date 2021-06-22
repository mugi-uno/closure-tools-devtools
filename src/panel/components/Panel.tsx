import classNames from "classnames";
import React, { useEffect } from "react";
import { postMessage } from "../../port";
import { actions } from "../modules/slice";
import { useDispatch, useSelector } from "../modules/store";
import searchSVG from "../resources/search_black_24dp.svg";
import { ClosureComponentTree } from "./ClosureComponentTree";

export const Panel: React.FC = () => {
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
    <main>
      <header className="fixed w-full bg-white h-[48px] flex items-center shadow z-50">
        <button
          type="button"
          onClick={handleHighlightButton}
          className={classNames("rounded-full border cursor-pointer m-2 p-1", { "border-red-400": highlightEnabled })}
        >
          <img src={searchSVG} className="object-contain" />
        </button>
      </header>
      <main className="pt-[64px]">
        <ClosureComponentTree components={components} depth={1} />
      </main>
    </main>
  );
};
