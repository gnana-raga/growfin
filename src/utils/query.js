export const convertQueryToObject = (inputString) => {
  const keyValuePairs = inputString.split(",");

  // Create an empty object to store the converted values
  const convertedObject = {};

  // Iterate through the key-value pairs and populate the object
  keyValuePairs.forEach((pair) => {
    // Split each pair by the equal sign to get the key and value
    const [key, value] = pair.split("=");

    // Add the key-value pair to the object
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
