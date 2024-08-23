const camalize = (str) => {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase())
    .replace(/-([a-z])/g, function (m, w) {
      return w.toUpperCase();
    });
};

export default camalize;

// from stackoverflow
