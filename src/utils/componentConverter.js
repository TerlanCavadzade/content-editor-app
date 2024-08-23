export const convert = (componentArray) => {
  return componentArray.map((componentObj) => componentObj.component);
};

export const undoConvert = (componentArray) => {
  if (!componentArray) return [];
  return componentArray.map((component) => ({ id: Math.random(), component }));
};
