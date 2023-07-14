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

  const cleanedString = string.replace(/'/g, "");

  const pairs = cleanedString.split("&");

  const result = [];
  for (let i = 0; i < pairs.length; i += 2) {
    const title = pairs[i].split("=")[1];
    const rank = pairs[i + 1].split("=")[1];
    result.push({ title, rank: parseInt(rank) });
  }
  return result;
};

export const objectCreator = (obj, keyArray) => {
  let newObj = {};

  for (var i = 0; i < keyArray.length; i++) {
    if (obj[keyArray[i]]) {
      newObj[keyArray[i]] = obj[keyArray[i]];
    }
  }
  return newObj;
};
