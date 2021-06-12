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
    navigation.navigate(routes.topicprogress, {courseID, courseName});
  };

  useEffect(() => {
    getAllMyActiveCourses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Container verticalHeight={0}>
      <Header backArrow={false} />
      <View style={styles.coursesContainer}>
        <Text style={styles.title}>Course Progress</Text>
        {userCourses.length > 0 ? (
          userCourses.map((course, index) => {
            return (
              <TouchableOpacity
                onPress={
                  course.numberOfTopics > 0
                    ? () => handleMoreDetails(course.courseID, course.name)
                    : () => Alert.alert('Course has no topics!')
                }
                key={index}
                style={styles.courseContainer}>
                <View style={{display: 'flex', justifyContent: 'center'}}>
                  <Image
                    style={{width: 100, height: 100}}
                    source={{uri: course.coverImageURL}}
                  />
                </View>
                <View style={styles.detailsContainer}>
                  <Text style={styles.courseName}>{course.name}</Text>
                  <Text style={styles.details}>
                    {course.numberOfTopics > 0
                      ? 'See completed topics'
                      : 'Course has no topics'}
                  </Text>
                  {course.numberOfTopics > 0 ? (
                    <>
                      <ProgressBar
                        completed={course.ratioFinished * 100}
                        toFinish={(1 - course.ratioFinished) * 100}
                      />
                      <Text style={styles.completion}>
                        {course.ratioFinished * 100}% Completed
                      </Text>
                    </>
                  ) : (
                    <Text style={styles.completion}>N/A</Text>
                  )}
                </View>
              </TouchableOpacity>
            );
          })
        ) : (
          <Text style={styles.noContent}>
            You have no enrolled courses yet!
          </Text>
        )}
      </View>
    </Container>
  );
};

export default CourseProgressView;
