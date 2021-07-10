declare const goog = any;
declare const closuretoolsdevtools = any;
declare interface Window {
  __CLOSURE_TOOLS_DEVTOOLS__: {
    setup: () => void;
    getComponentData: (id: string) => string;
    activated: boolean;
  };
}

declare module "*.svg";
