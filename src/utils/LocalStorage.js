import AsyncStorage from '@react-native-async-storage/async-storage';

const setValue = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.log(e);
  }
};

/**
 * Get Value From Local Storage
 * @param key
 */
const getValue = async (key) => {
  try {
    let jsonValue = await AsyncStorage.getItem(key);
    if (jsonValue !== null) {
      jsonValue = JSON.parse(jsonValue);
      return jsonValue;
    }
    return null;
  } catch (e) {
    console.log(e);
  }
};

const ClearData = () => {
  AsyncStorage.clear();
};

export default { getValue, setValue, ClearData };
