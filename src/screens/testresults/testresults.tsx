import {View, Image, TouchableOpacity, Text, Alert} from 'react-native';
import React, {useEffect, useState, useContext} from 'react';
import Container from '../../components/container/container';
import styles from './styles';
import {StateContext, StatusContext} from '../../services/context';
import {StateCtx, StatusCtx} from '../../interfaces';
import * as SecureStore from 'expo-secure-store';
import CourseService from '../../services/courses';
import routes from '../../routes';
import ProgressBar from '../../components/progressBar';
import Header from '../../components/header/header';
import Logo from '../../assets/icons/back-arrow.png';
type Props = {
  navigation: any;
  route: {params: {topicID: string; topicName: string}};
};

const TestResultsView: React.FC<Props> = ({navigation, route}): JSX.Element => {
  const {topicID, topicName} = route.params;

  const [userCourses, setUserCourses] = useState<any[]>([]);

  const {updateUser} = useContext<StateCtx>(StateContext);
  const {showProgressDialog, hideProgressDialog} =
    useContext<StatusCtx>(StatusContext);

  const getAllMyActiveCourses = async () => {
    showProgressDialog();
    const {serverRes, error} = await CourseService.getMyCourses();
    hideProgressDialog();
    if (!error) {
      setUserCourses(serverRes.data);
    }
    if (serverRes?.status === 401) {
      await SecureStore.deleteItemAsync('session');
      updateUser({});
      navigation.reset({
        index: 0,
        routes: [{name: routes.initial}],
      });
    }
    if (error) {
      Alert.alert(serverRes?.data?.msg);
    }
  };

  useEffect(() => {
    getAllMyActiveCourses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Container verticalHeight={0}>
      <Header logoSrc={Logo} onPressBack={navigation.goBack} />
      <View style={styles.coursesContainer}>
        <Text style={styles.title}>Test Results - {topicName}</Text>
      </View>
    </Container>
  );
};

export default TestResultsView;
