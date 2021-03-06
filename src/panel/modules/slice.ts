import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { generateID } from "../../lib/generateID";
import { postMessage } from "../../port";
import { ClosureComponentType, EventDispatchEventObject } from "../../types";

interface State {
  highlightEnabled: boolean;
  selectedElement: {
    id: string;
    data: unknown | null;
  } | null;
  components: ClosureComponentType[];
  flatComponents: ClosureComponentType[];
  events: { id: string; event: EventDispatchEventObject }[];
}

const initialState: State = {
  highlightEnabled: false,
  selectedElement: null,
  components: [],
  flatComponents: [],
  events: [],
};

export const { actions, reducer } = createSlice({
  name: "panel",
  initialState,
  reducers: {
    reset(state) {
      state.highlightEnabled = false;
      state.selectedElement = null;
      state.components = [];
      state.flatComponents = [];
      state.events = [];
    },
    selectElement(state, action: PayloadAction<{ id: string }>) {
      state.selectedElement = { ...action.payload, data: null };
      state.highlightEnabled = false;
      postMessage({ type: "DISABLE_HIGHLIGHT" });
      postMessage({ type: "GET_COMPONENT_DATA", payload: { id: action.payload.id } });
    },
    detectComponentData(state, action: PayloadAction<{ id: string; data: string }>) {
      if (state.selectedElement && state.selectedElement.id === action.payload.id) {
        try {
          state.selectedElement.data = JSON.parse(action.payload.data);
        } catch (e) {
          state.selectedElement.data = null;
        }
      }
    },
    enableHighlight(state) {
      state.highlightEnabled = true;
      postMessage({ type: "ENABLE_HIGHLIGHT" });
    },
    disableHighlight(state) {
      state.highlightEnabled = false;
      postMessage({ type: "DISABLE_HIGHLIGHT" });
    },
    detectedComponents(state, action: PayloadAction<ClosureComponentType[]>) {
      const convert = (components: ClosureComponentType[]): State["components"] => {
        return components.map((c) => ({
          ...c,
          childComponents: convert(c.childComponents),
          openTree: true,
        }));
      };
      state.components = convert(action.payload);

      const flatten = (components: ClosureComponentType[]): ClosureComponentType[] => {
        return components.flatMap((component) => {
          return [component, ...flatten(component.childComponents)];
        });
      };

      state.flatComponents = flatten(state.components);
    },
    selectNextOrPrevComponent(state, action: PayloadAction<{ direction: "prev" | "next" }>) {
      if (!state.selectedElement) return;
      if (!state.flatComponents.length) return;

      const index = state.flatComponents.findIndex((c) => c.id === state.selectedElement?.id);

      if (index === 0 && action.payload.direction === "prev") return;
      if (index === state.flatComponents.length - 1 && action.payload.direction === "next") return;

      const newSelected = state.flatComponents[action.payload.direction === "prev" ? index - 1 : index + 1];

      state.selectedElement = { id: newSelected.id, data: null };
      postMessage({ type: "GET_COMPONENT_DATA", payload: { id: newSelected.id } });
    },
    eventDispached(state, action: PayloadAction<EventDispatchEventObject>) {
      state.events.push({ id: generateID(), event: action.payload });
    },
    clearDispatchedEvents(state) {
      state.events = [];
    },
  },
});
