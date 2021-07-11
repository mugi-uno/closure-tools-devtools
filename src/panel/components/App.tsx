import React, { useState } from "react";
import { ComponentsPane } from "./ComponentsPane";
import { EventsPane } from "./EventsPane";
import { Tab } from "./Tab";

type Pane = "Components" | "Events";

export const App: React.FC<{}> = () => {
  const [activePane, setActivePane] = useState<Pane>("Components");

  return (
    <>
      <header className="flex fixed z-[99999] w-full bg-white shadow-sm h-[32px]">
        <Tab active={activePane === "Components"} onClick={() => setActivePane("Components")}>
          Components
        </Tab>
        <Tab active={activePane === "Events"} onClick={() => setActivePane("Events")}>
          Events
        </Tab>
      </header>
      <main className="relative pt-[32px] flex w-full h-screen">
        <ComponentsPane show={activePane === "Components"} />
        <EventsPane show={activePane === "Events"} />
      </main>
    </>
  );
};
