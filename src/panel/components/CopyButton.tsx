import classNames from "classnames";
import React, { MouseEventHandler, useState } from "react";
import copySVG from "../resources/content_copy_black_24dp.svg";
import doneSVG from "../resources/done_black_24dp.svg";

type Props = {
  text: string;
  className?: string;
};

export const CopyButton: React.VFC<Props> = (props) => {
  const [copied, setCopied] = useState(false);

  const onClick: MouseEventHandler = (event) => {
    event.stopPropagation();
    const textarea = document.createElement("textarea");
    textarea.setAttribute("style", "position:absolute;left:-100%");
    document.body.appendChild(textarea);
    textarea.value = props.text;
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  return (
    <button className={classNames(props.className, "cursor-pointer p-0.5 transition-all")} onClick={onClick}>
      {copied ? <img src={doneSVG} className="w-[16px]" /> : <img src={copySVG} className="w-[16px]" />}
    </button>
  );
};
