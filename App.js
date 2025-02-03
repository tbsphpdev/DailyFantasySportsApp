import AsyncStorage from '@react-native-async-storage/async-storage';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist';
import rootSaga from './src/helpers/reduxHelper/rootSaga';
import rootReducer from './src/helpers/reduxHelper/rootReducer';
import { applyMiddleware, legacy_createStore } from 'redux';
import React, { useEffect, useState } from 'react';

import { StatusBar, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { NavigationContainer } from '@react-navigation/native';
import { AUTHTOKEN, USERDETAILS } from './src/helpers/ApiRoutes';
import LocalStorage from './src/utils/LocalStorage';
import NavigationStack from './src/navigation/NavigationStack';
import LinearGradient from 'react-native-linear-gradient';
import { DataProvider } from './src/hook/DataProvider';
import { Colors } from './src/assets/constants';
import Toast from 'react-native-toast-message';
import { enableScreens } from 'react-native-screens';
import { StripeProvider } from '@stripe/stripe-react-native';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: [
    // Persist reducers
    'StoreAuthReducer'
  ],
  blacklist: ['AuthReducer']
};

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();
const persistedReducer = persistReducer(persistConfig, rootReducer);
// mount it on the Store
export const store = legacy_createStore(persistedReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);
let persistor = persistStore(store);

function App() {
  const [userDetails, setUserDetails] = useState('');
  const [authToken, setAuthToken] = useState('');
  // const [publishableKey, setPublishableKey] = useState('');

  useEffect(() => {
    if (Platform.OS === 'ios') {
      enableScreens(false);
    }
    handleData();
  }, []);

  const handleData = () => {
    LocalStorage.getValue(USERDETAILS).then((data) => {
      if (data) {
        setUserDetails(data);
      }
    });

    LocalStorage.getValue(AUTHTOKEN).then((data) => {
      if (data) {
        setAuthToken(data);
      }
    });
  };

  return (
    <SafeAreaProvider>
      <StripeProvider publishableKey="pk_test_51ONXVvBmRiAVyuX6YjtOp1Wm30fKlu9BJKeN242RB4UmVnrS1EqmKzjvC5ISQHMf3K1DgzOD4Bwa6APl59pcR0ZV00190JCLkO">
        <GradientStatusBar />
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <NavigationContainer>
              <DataProvider>
                <NavigationStack userDetails={userDetails} authToken={authToken}></NavigationStack>
              </DataProvider>
            </NavigationContainer>
          </PersistGate>
        </Provider>
        <Toast />
      </StripeProvider>
    </SafeAreaProvider>
  );
}

const GradientStatusBar = () => {
  return (
    <View style={{ height: StatusBar.currentHeight }}>
      <LinearGradient
        colors={[Colors.gradient1, Colors.gradient2]} // Set your desired gradient colors
        start={{ x: 0, y: 0 }} // Set the start point of the gradient
        end={{ x: 1, y: 0 }} // Set the end point of the gradient
        style={{ flex: 1 }}>
        <StatusBar translucent={true} backgroundColor={'transparent'} barStyle={'light-content'} />
      </LinearGradient>
    </View>
  );
};

export default App;
