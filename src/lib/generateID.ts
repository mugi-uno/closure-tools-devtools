export const generateID = (() => {
  let id = 1;
  return () => `id${id++}`;
})();
