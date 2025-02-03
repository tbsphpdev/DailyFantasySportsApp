import Toast from 'react-native-toast-message';

const errorToast = (msg) => {
  return Toast.show({ type: 'error', text1: msg, position: 'bottom' });
};

const successToast = (msg) => {
  return Toast.show({ type: 'success', text1: msg, position: 'bottom' });
};

const infoToast = (msg) => {
  return Toast.show({ type: 'info', text1: msg, position: 'bottom' });
};

export default { errorToast, successToast, infoToast };
