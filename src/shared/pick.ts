const pick = <T extends object, k extends keyof T>(object: T, array: k[]) => {
  const finalObj: Partial<T> = {};
  for (const key of array) {
    if (object && Object.hasOwnProperty.call(object, key)) {
      finalObj[key] = object[key];
    }
  }
  return finalObj;
};

export default pick;
