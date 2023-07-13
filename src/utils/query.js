export const convertQueryToObject = (inputString) => {
  const keyValuePairs = inputString.split(",");

  const convertedObject = {};

  keyValuePairs.forEach((pair) => {
    const [key, value] = pair.split("=");

    convertedObject[key && key.trim()] = value && value.trim();
  });
  return convertedObject;
};

export const convertQueryToRank = (string) => {
  const pattern = /title='([^']*)'&rank=(\d+)/g;
  const matches = string.match(pattern);
  if (!matches) {
    return null;
  }
  const pairs = string.split("&");
  const data = [];
  pairs.forEach((pair) => {
    const [key, value] = pair.split("=");
    const cleanedValue = value.replace(/'/g, "");
    const existingObjIndex = data.findIndex((obj) => obj.title === key);

    if (existingObjIndex !== -1) {
      data[existingObjIndex].rank = cleanedValue;
    } else {
      data.push({ title: cleanedValue, rank: "" });
    }
  });

  return data;
};
