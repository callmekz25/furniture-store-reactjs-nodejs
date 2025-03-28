const arraysEqual = (arr1, arr2) => {
  if (arr1.length !== arr2.length) return false;
  const count = (arr) =>
    arr.reduce((acc, val) => ((acc[val] = (acc[val] || 0) + 1), acc), {});
  return JSON.stringify(count(arr1)) === JSON.stringify(count(arr2));
};
export default arraysEqual;
