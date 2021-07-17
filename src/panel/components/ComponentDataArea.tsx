import React from "react";
import ReactJson from "react-json-view";
import { useSelector } from "../modules/store";

export const ComponentDataArea: React.FC = () => {
  const selectedElement = useSelector((state) => state.panel.selectedElement?.data as any);

  return (
    <section className="p-2 py-4">
      {selectedElement && <ReactJson src={selectedElement} name={false} displayDataTypes={false} collapsed={2} />}
    </section>
  );
};
