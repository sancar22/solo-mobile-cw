import {
  Alert,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import Container from '../../components/container/container';
import {StateContext, StatusContext} from '../../services/context';
import {StateCtx, StatusCtx} from '../../interfaces';
import CourseService from '../../services/courses';
import * as SecureStore from 'expo-secure-store';
import routes from '../../routes';
import styles from './styles';
import Header from '../../components/header/header';
import {SearchBar} from 'react-native-elements';
import Logo from '../../assets/icons/back-arrow.png';
import {alertWithOptions} from '../../helperFunctions/index';

type Props = {
  navigation: any;
};

const HomeView: React.FC<Props> = ({navigation}): JSX.Element => {
  const [courses, setCourses] = useState<any[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<any[]>([]);
  const [term, setTerm] = useState<string>('');
  const {updateUser, user} = useContext<StateCtx>(StateContext);
  const {showProgressDialog, hideProgressDialog} =
    useContext<StatusCtx>(StatusContext);

  useEffect(() => {
    const newFilteredCourses = courses.filter(course =>
      course.name.toLowerCase().includes(term.toLowerCase()),
    );
    setFilteredCourses(newFilteredCourses);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [term]);

  const getAllActiveCourses = async () => {
    const {serverRes, error} = await CourseService.getActiveCourses();
    hideProgressDialog();
    if (!error) {
      setCourses(serverRes.data);
      setFilteredCourses(serverRes.data);
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

  const handleEnrollment = async (course: any) => {
    // const {serverRes, error} = await CourseService.enrollFreeCourse(course);
    // hideProgressDialog();
    // if (!error) {
    //   Alert.alert(serverRes.data);
    //   getAllActiveCourses();
    // }
    // if (serverRes?.status === 401) {
    //   await SecureStore.deleteItemAsync('session');
    //   updateUser({});
    //   navigation.reset({
    //     index: 0,
    //     routes: [{name: routes.initial}],
    //   });
    // }
    // if (error) {
    //   Alert.alert(serverRes?.data?.msg);
    // }
    navigation.navigate(routes.carousel, {courseID: course._id});
  };
  const handleCourseSelection = (course: any) => {
    if (course.enrolled) {
      Alert.alert('You are already enrolled in the course');
    }
    if (!course.enrolled && course.free) {
      alertWithOptions(
        'This course is free!',
        'Are you sure you want to enroll?',
        'No',
        () => {},
        'Yes',
        () => handleEnrollment(course),
      );
    }
    if (!course.enrolled && !course.free) {
      alertWithOptions(
        'This course is premium!',
        'Are you sure you want to enroll?',
        'No',
        () => {},
        'Yes',
        () => handleEnrollment(course),
      );
    }
  };

  useEffect(() => {
    showProgressDialog();
    getAllActiveCourses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container verticalHeight={0}>
      <View style={styles.body}>
        <Header logoSrc={Logo} backArrow={false} />
        <Text style={styles.welcomeText}>Welcome, {user.name}!</Text>
        <View>
          <SearchBar
            placeholder="Search for a course..."
            onChangeText={setTerm}
            value={term}
            platform="android"
            placeholderTextColor={'rgba(128, 128, 128, 1)'}
            inputContainerStyle={styles.searchInput}
          />
        </View>
        {filteredCourses.length > 0 &&
          filteredCourses.map((course, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => handleCourseSelection(course)}
                style={styles.backgroundContainer}>
                <ImageBackground
                  source={{uri: course.coverImageURL}}
                  style={styles.backgroundImage}>
                  <Text style={styles.textBackground}>{course.name}</Text>
                  {course.enrolled && (
                    <Text style={styles.textBackground}>Enrolled</Text>
                  )}
                  {course.free ? (
                    <Text>Free</Text>
                  ) : (
                    <Text>${parseFloat(course.price.$numberDecimal)}</Text>
                  )}
                </ImageBackground>
              </TouchableOpacity>
            );
          })}
      </View>
    </Container>
  );
};

export default HomeView;
