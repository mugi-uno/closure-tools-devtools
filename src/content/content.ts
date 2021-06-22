import { MatchMessage, PanelMessages } from "./../port";
import { connect } from "../port";
import { disableHoverHook, enableHoverHook } from "./hoverHook";
import { scanComponents } from "./scanComponents";
import { highlight, unhighlight } from "./highlight";

const handlerMap: {
  [key in PanelMessages["type"]]?: (msg: MatchMessage<PanelMessages, key>) => void;
} = {
  ENABLE_HIGHLIGHT: () => {
    enableHoverHook();
  },
  DISABLE_HIGHLIGHT: () => {
    disableHoverHook();
  },
  SCAN_COMPONENTS: () => {
    scanComponents();
  },
  HIGHLIGHT_ELEMENT: (msg) => {
    unhighlight();
    highlight(msg.payload.id);
  },
  UNHIGHLIGHT_ELEMENT: () => {
    unhighlight();
  },
};

connect("content").onMessage.addListener((msg: PanelMessages) => {
  const handler = handlerMap[msg.type];
  if (handler) {
    handler(msg as any);
  }
  return false;
});
