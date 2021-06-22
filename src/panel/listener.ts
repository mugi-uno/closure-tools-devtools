import { currentPort, MatchMessage, ContentMessages } from "./../port";
import { actions } from "./modules/slice";
import { AppDispatch } from "./modules/store";

export const listener = (dispatch: AppDispatch) => {
  const handlerMap: {
    [key in ContentMessages["type"]]?: (msg: MatchMessage<ContentMessages, key>) => void;
  } = {
    SELECTED_ACTIVE_ELEMENT: (msg) => {
      dispatch(actions.selectElement(msg.payload));
    },
    SCANNED_COMPONENTS: (msg) => {
      dispatch(actions.detectedComponents(msg.payload.components));
    },
  };

  currentPort()?.onMessage.addListener((msg: ContentMessages) => {
    const handler = handlerMap[msg.type];
    if (handler) {
      handler(msg as any);
    }
    return false;
  });
};
