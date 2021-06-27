import 'react-native-gesture-handler';
import React, {useEffect, useState, useReducer, useMemo} from 'react';
import {
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
import {VISIBLE, HIDDEN, USER, TEST_RESULTS} from './src/constants';

import Orientation from 'react-native-orientation';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

// Views
import routes from './src/routes';
import InitialView from './src/screens/initial/initial';
import HomeView from './src/screens/home/home';
import RegisterView from './src/screens/register/register';
import PWForgotView from './src/screens/pwforgot/pwforgot';
import PWCodeView from './src/screens/pwcode/pwcode';
import PWChangeView from './src/screens/pwchange/pwchange';
import CourseProgressView from './src/screens/courseprogress/courseprogress';
import SettingsView from './src/screens/settings/settings';
import CarouselView from './src/screens/carousel/carousel';
import PaymentView from './src/screens/payment/payment';
import TopicsView from './src/screens/topics/topics';
import VideoView from './src/screens/video/video';
import QuestionsView from './src/screens/questions/questions';
import ScoreView from './src/screens/score/score';
import TopicProgressView from './src/screens/topicprogress/topicprogress';
import TestResultsView from './src/screens/testresults/testresults';
import PWInsideView from './src/screens/pwinside/pwinside';

import colors from './src/constants/colors';
import {Params, Topic, User} from './src/interfaces';

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

const HomeTabs = (props: {navigation: any}) => {
  const {navigation} = props;

  const handleUrl = (url: string | null = '') => {
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
    Linking.getInitialURL().then((url: string | null) => handleUrl(url));
    Linking.addEventListener('url', e => handleUrl(e.url));
    return () => {
      Linking.removeAllListeners('url');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Tab.Navigator
      initialRouteName={routes.home}
      backBehavior="order"
      tabBarOptions={{
        showLabel: true,
        keyboardHidesTabBar: true,
        labelStyle: styles.tabLabelStyle,
        style: styles.tabStyle,
        iconStyle: styles.tabIconStyle,
        tabStyle: styles.tabTabStyle,
        activeTintColor: colors.black,
      }}>
      <Tab.Screen
        name={routes.home}
        component={HomeView}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: p => <Icon {...p} name="search" size={30} />,
        }}
      />
      <Tab.Screen
        name={routes.courseprogress}
        component={CourseProgressView}
        options={{
          tabBarLabel: 'Progress',
          tabBarIcon: p => <Icon {...p} name="books" size={30} />,
        }}
      />
      <Tab.Screen
        name={routes.settings}
        component={SettingsView}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: p => <Icon {...p} name="cog" size={30} />,
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
      visible: false,
      label: '',
      showProgressDialog: (label = '') =>
        dispatchStatus({type: VISIBLE, label}),
      hideProgressDialog: () => dispatchStatus({type: HIDDEN, label: ''}),
    }),
    [],
  );

  const stateContext = useMemo(
    () => ({
      updateUser: (user: User) => dispatchState({type: USER, user}),
      // TODO - possibly wrong topic type
      updateCurrentTopic: (currentTopicResult: Topic) =>
        dispatchState({type: TEST_RESULTS, currentTopicResult}),
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
    // if (user) {
    //   dispatchState({type: USER, user: JSON.parse(user)});
    // }
  };
  useEffect(() => {
    initializeApp();
  }, []);

  const onStateChange = async (params: Params | undefined) => {
    if (!params) {
      return;
    }
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
              <Stack.Screen name={routes.home} component={HomeTabs} />
              <Stack.Screen name={routes.initial} component={InitialView} />
              <Stack.Screen name={routes.register} component={RegisterView} />
              <Stack.Screen name={routes.forgot} component={PWForgotView} />
              <Stack.Screen name={routes.pwcode} component={PWCodeView} />
              <Stack.Screen name={routes.pwchange} component={PWChangeView} />
              <Stack.Screen name={routes.carousel} component={CarouselView} />
              <Stack.Screen name={routes.payment} component={PaymentView} />
              <Stack.Screen name={routes.topics} component={TopicsView} />
              <Stack.Screen name={routes.video} component={VideoView} />
              <Stack.Screen name={routes.questions} component={QuestionsView} />
              <Stack.Screen name={routes.score} component={ScoreView} />
              <Stack.Screen
                name={routes.topicprogress}
                component={TopicProgressView}
              />
              <Stack.Screen
                name={routes.testresults}
                component={TestResultsView}
              />
              <Stack.Screen name={routes.pwiniside} component={PWInsideView} />
            </Stack.Navigator>
          </StateContext.Provider>
        </StatusContext.Provider>
        <ProgressDialog visible={status.visible} label={status.label} />
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default App;
