export type ClosureComponentType = {
  id: string;
  name: string;
  childComponents: ClosureComponentType[];
};

export type EventDispatchEventObject = { moduleName: string; eventName: string; eventDetail: string; timestamp: number };
export type EventDispatchBindingCallback = (event: EventDispatchEventObject) => any;

export const EventDispatchedEventName = "closure-tools-devtools-dispatched-event";
export const MODULE_NAME_ATTRIBUTE_NAME = "data-closure-tools-devtools-component-name";
export const ID_ATRRIBUTE_NAME = "data-closure-tools-devtools-id";
