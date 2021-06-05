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
};

const CourseProgressView: React.FC<Props> = ({navigation}): JSX.Element => {
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

  const handleMoreDetails = (courseID: string, courseName: string) => {
    console.log(courseID);
  };

  useEffect(() => {
    getAllMyActiveCourses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Container verticalHeight={0}>
      <Header logoSrc={Logo} backArrow={false} />
      <View style={styles.coursesContainer}>
        <Text style={styles.title}>Course progress</Text>
        {userCourses.length > 0 &&
          userCourses.map((course, index) => {
            return (
              <View key={index}>
                <Text style={styles.courseName}>{course.name}</Text>
                <Text style={{marginBottom: 20}}>
                  You have completed {course.topicsCompleted} out of{' '}
                  {course.numberOfTopics} topics!
                </Text>
                <ProgressBar
                  completed={course.ratioFinished * 100}
                  toFinish={(1 - course.ratioFinished) * 100}
                />
                <TouchableOpacity
                  style={styles.testBtn}
                  onPress={() =>
                    handleMoreDetails(course.courseID, course.name)
                  }>
                  <Text style={styles.testBtnTxt}>See More</Text>
                </TouchableOpacity>
              </View>
            );
          })}
      </View>
    </Container>
  );
};

export default CourseProgressView;
