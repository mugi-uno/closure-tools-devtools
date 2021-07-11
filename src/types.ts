export type ClosureComponentType = {
  id: string;
  name: string;
  childComponents: ClosureComponentType[];
};

export type EventDispatchEventObject = { moduleName: string; eventName: string; eventDetail: string; timestamp: number };
export const EventDispatchedEventName = "closure-tools-devtools-dispatched-event";

export type GetComponentDataRequestEventObject = { id: string };
export const GetComponentDataRequestEventName = "closure-tools-devtools-get-component-data-request-event";
export type GetComponentDataResponseEventObject = { id: string; data: string };
export const GetComponentDataResponseEventName = "closure-tools-devtools-get-component-data-response-event";

export const MODULE_NAME_ATTRIBUTE_NAME = "data-closure-tools-devtools-component-name";
export const ID_ATRRIBUTE_NAME = "data-closure-tools-devtools-id";
