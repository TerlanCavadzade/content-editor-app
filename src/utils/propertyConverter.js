import camalize from "./camelCase";

export const convert = (styles) => {
  const result = {};

  styles.forEach((style) => {
    const convertedPropertyName = camalize(style.property);
    result[convertedPropertyName] = style.value;
  });

  return result;
};

export const undoConvert = (styles) => {
  if (!styles) return [];
  const result = [];

  for (const key in styles) {
    result.push({ property: key, value: styles[key], id: Math.random() });
  }
  return result;
};


