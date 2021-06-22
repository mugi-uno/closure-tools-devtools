import React from "react";
import { ClosureComponentType } from "../../types";
import { ClosureComponent } from "./ClosureComponent";

type Props = {
  components: ClosureComponentType[];
  depth: number;
};

export const ClosureComponentTree: React.FC<Props> = (props) => {
  return (
    <div>
      {props.components.map((component) => (
        <ClosureComponent key={component.id} component={component} depth={props.depth} />
      ))}
    </div>
  );
};
