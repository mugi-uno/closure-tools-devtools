import mitt, { Emitter } from "mitt";

export const Events = {
  EnableHighlight: {},
  DisableHighlight: {},
} as const;

export const emitter: Emitter<typeof Events> = mitt<typeof Events>();
