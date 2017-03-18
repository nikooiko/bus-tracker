
const bindFunctions = (self, functions) => {
  functions.forEach(f => self[f] = self[f].bind(self));
};

export default bindFunctions;
