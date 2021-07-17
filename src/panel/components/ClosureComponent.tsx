import classNames from "classnames";
import React, { createRef, KeyboardEventHandler, MouseEventHandler, useEffect, useRef, useState } from "react";
import { postMessage } from "../../port";
import { ClosureComponentType } from "../../types";
import { useRenderState } from "../hooks/useRenderState";
import { actions } from "../modules/slice";
import { useDispatch, useSelector } from "../modules/store";
import { ClosureComponentTree } from "./ClosureComponentTree";
import { CopyButton } from "./CopyButton";

type Props = {
  component: ClosureComponentType;
  depth: number;
};

export const ClosureComponent: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  const ref = useRef<HTMLDivElement>(null);

  const [openTree, setOpenTree] = useState(true);
  const [hovered, setHovered] = useState(false);
  const { renderStateClassObject } = useRenderState();

  const selectedElement = useSelector((state) => state.panel.selectedElement);
  const hasChildComponents = props.component.childComponents.length > 0;
  const isSelected = selectedElement?.id === props.component.id;

  const { component } = props;

  const handleOpenTree: MouseEventHandler = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setOpenTree(!openTree);
  };

  const handleClick = () => {
    dispatch(actions.selectElement(props.component));
  };

  const handleMouserOver = () => {
    setHovered(true);
    postMessage({ type: "HIGHLIGHT_ELEMENT", payload: { id: component.id } });
  };

  const handeMouseLeave = () => {
    setHovered(false);
    postMessage({ type: "UNHIGHLIGHT_ELEMENT" });
  };

  const handleKeyDown: KeyboardEventHandler = (event) => {
    if (!isSelected) return;
    if (event.key === "ArrowUp") {
      event.preventDefault();
      dispatch(actions.selectNextOrPrevComponent({ direction: "prev" }));
    }
    if (event.key === "ArrowDown") {
      event.preventDefault();
      dispatch(actions.selectNextOrPrevComponent({ direction: "next" }));
    }
    if (hasChildComponents && (event.key === "ArrowRight" || event.key === "ArrowLeft")) {
      event.preventDefault();
      setOpenTree(!openTree);
    }
  };

  useEffect(() => {
    if (isSelected) {
      ref.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      ref.current?.focus();
    }
  }, [isSelected]);

  return (
    <>
      <div
        className={classNames(
          "text-sm text-gray-800 font-mono py-0.5 transition-all cursor-pointer select-none focus:outline-none bg-white relative",
          {
            ...renderStateClassObject,
            "bg-red-400": isSelected,
            "hover:bg-gray-200": !isSelected,
          }
        )}
        onClick={handleClick}
        onMouseOver={handleMouserOver}
        onMouseLeave={handeMouseLeave}
        onKeyDown={handleKeyDown}
        ref={ref}
        style={{
          paddingLeft: `${props.depth * 24}px`,
        }}
        tabIndex={0}
      >
        <div className="relative">
          {hasChildComponents ? (
            <span
              onClick={handleOpenTree}
              className={classNames("absolute -left-4 transition-all", { "rotate-0": openTree, "-rotate-90": !openTree })}
            >
              ▼
            </span>
          ) : null}
          <span className={classNames({ "text-white font-bold": isSelected })}>{props.component.name}</span>
        </div>

        <CopyButton
          text={props.component.name}
          className={classNames("absolute top-[2px] right-0 z-[100] transition-all", {
            "opacity-80": hovered,
            "opacity-0": !hovered,
          })}
        />
      </div>
      {hasChildComponents && openTree ? <ClosureComponentTree components={component.childComponents} depth={props.depth + 1} /> : null}
    </>
  );
};
