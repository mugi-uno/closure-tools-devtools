import classNames from "classnames";
import React from "react";

type Props = {
  checked: boolean;
  onChange: React.ChangeEventHandler;
  label: string;
  className?: string;
};

export const Checkbox: React.VFC<Props> = (props) => {
  return (
    <label className={classNames("flex items-center pr-2", props.className)}>
      <input type="checkbox" className="mr-0.5" onChange={props.onChange} checked={props.checked} />
      <span>{props.label}</span>
    </label>
  );
};
