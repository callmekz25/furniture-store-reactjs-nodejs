const attributesEqual = (obj1, obj2) => {
  const keys1 = Object.keys(obj1).sort();
  const keys2 = Object.keys(obj2).sort();

  if (keys1.length !== keys2.length) return false;

  for (let i = 0; i < keys1.length; i++) {
    const key = keys1[i];
    if (key !== keys2[i] || obj1[key] !== obj2[key]) {
      return false;
    }
  }

  return true;
};

export default attributesEqual;
