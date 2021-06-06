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
import Icon from 'react-native-vector-icons/FontAwesome';
import DropDownPicker from 'react-native-dropdown-picker';
import {LogBox} from 'react-native';

type Props = {
  navigation: any;
};

const HomeView: React.FC<Props> = ({navigation}): JSX.Element => {
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');
  const [items, setItems] = useState([
    {label: 'All', value: 'all', default: true},
    {label: 'Enrolled', value: 'enrolled'},
    {label: 'Free', value: 'free'},
    {label: 'Premium', value: 'premium'},
  ]);
  const [courses, setCourses] = useState<any[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<any[]>([]);
  const [term, setTerm] = useState<string>('');
  const {updateUser, user} = useContext<StateCtx>(StateContext);
  const {showProgressDialog, hideProgressDialog} =
    useContext<StatusCtx>(StatusContext);

  useEffect(() => {
    let newFilteredCourses: any[] = [];
    if (value === 'all') {
      newFilteredCourses = courses.filter(course =>
        course.name.toLowerCase().includes(term.toLowerCase()),
      );
    } else if (value === 'premium') {
      newFilteredCourses = courses.filter(
        course =>
          course.name.toLowerCase().includes(term.toLowerCase()) &&
          !course.free,
      );
    } else {
      newFilteredCourses = courses.filter(
        course =>
          course.name.toLowerCase().includes(term.toLowerCase()) &&
          course[value],
      );
    }

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
    navigation.navigate(routes.carousel, {courseID: course._id});
  };
  const handleCourseSelection = (course: any) => {
    if (course.enrolled) {
      navigation.navigate(routes.topics, {courseID: course._id});
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
    setValue('all');
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (value !== '') {
      const optionsValues: any = {
        all: function () {
          setFilteredCourses(courses);
        },
        free: function () {
          setFilteredCourses(courses.filter(course => course.free));
        },
        premium: function () {
          setFilteredCourses(courses.filter(course => !course.free));
        },
        enrolled: function () {
          setFilteredCourses(courses.filter(course => course.enrolled));
        },
      };
      if (!optionsValues[value]) {
        return null;
      }
      return optionsValues[value]();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <Container verticalHeight={0}>
      <View style={styles.body}>
        <Header logoSrc={Logo} backArrow={false} />
        <Text style={styles.welcomeText}>Welcome, {user.name}!</Text>
        <View style={styles.filterContainer}>
          <Text style={styles.filterText}>Filter by:</Text>
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            style={{width: 200}}
            zIndex={1000}
            containerStyle={{width: 200}}
          />
        </View>
        <View style={{marginTop: 30}}>
          <SearchBar
            placeholder="Search for a course..."
            onChangeText={setTerm}
            value={term}
            platform="android"
            placeholderTextColor={'rgba(128, 128, 128, 1)'}
            inputContainerStyle={styles.searchInput}
          />
        </View>
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => handleCourseSelection(course)}
                style={styles.backgroundContainer}>
                <ImageBackground
                  source={{uri: course.coverImageURL}}
                  style={styles.backgroundImage}>
                  <View style={styles.wholeTextContainer}>
                    <View style={styles.nameLock}>
                      <Text style={styles.textBackground}>{course.name}</Text>
                      {course.enrolled ? (
                        <Icon name="unlock" size={30} color="gray" />
                      ) : (
                        <Icon name="lock" size={25} color="gray" />
                      )}
                    </View>
                    <View style={styles.priceCont}>
                      {course.free ? (
                        <Text style={styles.textPrice}>Free</Text>
                      ) : (
                        <Text style={styles.textPrice}>
                          ${parseFloat(course.price.$numberDecimal)}
                        </Text>
                      )}
                    </View>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            );
          })
        ) : (
          <Text style={styles.noContent}>No courses yet!</Text>
        )}
      </View>
    </Container>
  );
};

export default HomeView;
