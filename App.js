import 'react-native-gesture-handler';
import React, {useEffect, useState, useReducer, useMemo} from 'react';
import {
  View,
  Text,
  Linking,
  BackHandler,
  LogBox,
  SafeAreaView,
  StyleSheet,
} from 'react-native';

import Icon from './src/components/icon/index';
import ProgressDialog from './src/components/progressDialog/index';

import {
  statusReducer,
  StatusContext,
  initialStatus,
  stateReducer,
  StateContext,
  initialState,
} from './src/services/context';
import {VISIBLE, HIDDEN, USER} from './src/constants/index';

import Orientation from 'react-native-orientation';
import * as SecureStore from 'expo-secure-store';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

// Views
import routes from './src/routes';
import InitialView from './src/screens/initial/initial';
import HomeView from './src/screens/home/home';

import axios from 'axios';
import {URL} from './src/constants/ngrok';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    position: 'relative',
  },
  tabLabelStyle: {
    marginTop: 4,
    fontSize: 12,
  },
  tabStyle: {
    height: 60,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIconStyle: {
    position: 'relative',
  },
  tabTabStyle: {
    paddingVertical: 8,
  },
});

const HomeTabs = props => {
  const {navigation} = props;

  const handleUrl = (url = '') => {
    if (!url) {
      return;
    }
    const path = url.replace(/.*?:\/\//g, '');
    const [routeName] = path.split('/');
    if (routeName === 'home') {
      navigation.navigate(routes.home, {});
    }
  };

  useEffect(() => {
    LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
    Orientation.lockToPortrait();
    Linking.getInitialURL().then(url => handleUrl(url));
    Linking.addEventListener('url', e => handleUrl(e.url));
    return () => {
      Linking.removeAllListeners('url');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Tab.Navigator
      initialRouteName={routes.inicio}
      backBehavior="order"
      tabBarOptions={{
        showLabel: true,
        keyboardHidesTabBar: true,
        labelStyle: styles.tabLabelStyle,
        style: styles.tabStyle,
        iconStyle: styles.tabIconStyle,
        tabStyle: styles.tabTabStyle,
        activeTintColor: '#FF8328',
      }}>
      <Tab.Screen
        name={routes.home}
        component={HomeView}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: p => <Icon {...p} name="home" size={30} />,
        }}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  const [previousRouteName, setPreviousRouteName] = useState('');

  const [status, dispatchStatus] = useReducer(statusReducer, initialStatus);
  const [state, dispatchState] = useReducer(stateReducer, initialState);

  const statusContext = useMemo(
    () => ({
      showProgressDialog: (label = '') =>
        dispatchStatus({type: VISIBLE, label}),
      hideProgressDialog: () => dispatchStatus({type: HIDDEN}),
    }),
    [],
  );

  const stateContext = useMemo(
    () => ({
      updateUser: user => dispatchState({type: USER, user}),
      ...state,
    }),
    [state],
  );

  //User can't go back during progressDialog
  useEffect(() => {
    let backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => status.visible,
    );

    return () => {
      backHandler.remove();
    };
  }, [status.visible]);

  // App initialization...
  const initializeApp = async () => {
    const user = JSON.parse(await SecureStore.getItemAsync(USER));
    // if (user) {
    //   dispatchState({type: USER, user: JSON.parse(user)});
    // }
  };
  useEffect(() => {
    initializeApp();
  }, []);

  const onStateChange = async params => {
    const currentRouteName = params.routes[params.index].name.toUpperCase();
    if (currentRouteName !== previousRouteName) {
      setPreviousRouteName(currentRouteName);
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <NavigationContainer onStateChange={onStateChange}>
        <StatusContext.Provider value={statusContext}>
          <StateContext.Provider value={stateContext}>
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
              }}
              initialRouteName={routes.initial}>
              <Stack.Screen name={routes.initial} component={InitialView} />
              <Stack.Screen name={routes.home} component={HomeTabs} />
            </Stack.Navigator>
          </StateContext.Provider>
        </StatusContext.Provider>
        <ProgressDialog visible={status.visible} label={status.label} />
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default App;
