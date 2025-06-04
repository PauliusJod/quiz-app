export const removeQuotes = (str: string) => {
  return str.replace(/^"(.*)"$/, "$1");
};
