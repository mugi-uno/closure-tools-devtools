import classNames from "classnames";
import React, { ReactNode } from "react";

type Props = {
  active: boolean;
  className?: string;
  children: ReactNode;
  onClick: () => void;
};

export const Tab: React.FC<Props> = (props) => {
  return (
    <button
      className={classNames(
        props.className,
        "text-sm px-4 py-0.5 text-gray-700 font-bold flex items-center select-none cursor-pointer transition-all border-b-2 hover:bg-gray-100",
        {
          "border-red-400": props.active,
          "border-transparent": !props.active,
        }
      )}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};
