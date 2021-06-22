export const getModuleName = () => {
  const stack = new Error().stack;
  const line = stack!.split("\n")[2];
  return line
    .replace(/^.* at /, "")
    .replace(/ .*$/, "")
    .replace(/\.goog\.ui\.Component.*/, "");
};
