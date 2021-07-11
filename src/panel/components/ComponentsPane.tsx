import classNames from "classnames";
import React from "react";
import { useSplitPane } from "../hooks/useSplitPane";
import { useSelector } from "../modules/store";
import { ClosureComponentTree } from "./ClosureComponentTree";
import { ComponentDataArea } from "./ComponentDataArea";
import { ComponentsPaneHeader } from "./ComponentsPaneHeader";

export const ComponentsPane: React.FC<{ show: boolean }> = (props) => {
  const components = useSelector((state) => state.panel.components);
  const { splitPaneHandlers, adjustBarHandlers, leftSize } = useSplitPane();

  return (
    <section className={classNames("flex w-full", { hidden: !props.show })} {...splitPaneHandlers}>
      <div className="max-h-full overflow-scroll relative" style={{ width: `${leftSize}px` }}>
        <ComponentsPaneHeader show={props.show} />
        <ClosureComponentTree components={components} depth={1} />
      </div>
      <div className="w-[12px] h-full flex justify-center items-center cursor-pointer select-none" {...adjustBarHandlers}>
        <div className="w-[1px] h-full bg-gray-200"></div>
      </div>
      <div className="max-h-full overflow-y-scroll flex-grow">
        <ComponentDataArea />
      </div>
    </section>
  );
};
