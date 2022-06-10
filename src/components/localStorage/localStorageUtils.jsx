const saveItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    return [];
  }
};

const readItem = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch (error) {
    return [];
  }
};

export { saveItem, readItem };
