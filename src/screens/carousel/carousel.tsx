import React, {useState, useEffect, useContext, useRef} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Alert,
  ImageBackground,
} from 'react-native';
import Container from '../../components/container/container';
import Header from '../../components/header/header';
import styles from './styles';
import routes from '../../routes';
import * as SecureStore from 'expo-secure-store';
import Dots from 'react-native-dots-pagination';
import Carousel from 'react-native-snap-carousel';
import Logo from '../../assets/icons/back-arrow.png';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {StatusCtx, StateCtx} from '../../interfaces';
import {StateContext, StatusContext} from '../../services/context';
import CourseService from '../../services/courses';

type Props = {
  navigation: any;
  route: {params: {courseID: string}};
};

type RenderCarousel = {
  index: number;
  item: any;
};

function moveToFront(array: any[], condition: any) {
  return array.splice(array.findIndex(condition), 1).concat(array);
}

const CarouselView: React.FC<Props> = ({navigation, route}): JSX.Element => {
  const {courseID} = route.params;
  const [carouselItems, setCarouselItems] = useState<any[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const {updateUser} = useContext<StateCtx>(StateContext);
  const {showProgressDialog, hideProgressDialog} =
    useContext<StatusCtx>(StatusContext);

  const carouselRef = useRef(null);

  const getAllActiveCourses = async () => {
    const {serverRes, error} = await CourseService.getActiveCourses();
    hideProgressDialog();
    if (!error) {
      const filterCourseNotEnrolled = serverRes.data.filter(
        (course: any) => !course.enrolled,
      );
      const courseSelectedToFront = moveToFront(
        filterCourseNotEnrolled.sort((a: any, b: any) => a._id - b._id),
        (a: any) => a._id === courseID,
      );
      setCarouselItems(courseSelectedToFront);
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
    showProgressDialog();
    getAllActiveCourses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEnrollFreeCourse = async () => {
    showProgressDialog();
    const selectedCourse = carouselItems[activeIndex];
    const {serverRes, error} = await CourseService.enrollFreeCourse(
      selectedCourse,
    );
    if (!error) {
      Alert.alert(serverRes.data);
      navigation.reset({
        index: 0,
        routes: [{name: routes.home}],
      });
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
    hideProgressDialog();
  };

  const handleEnrollPremiumCourse = () => {
    const selectedCourse = carouselItems[activeIndex];
    navigation.navigate(routes.payment, {course: selectedCourse});
  };

  const handleEnroll = () => {
    const selectedCourse = carouselItems[activeIndex];
    if (selectedCourse.formattedPrice === 0) {
      handleEnrollFreeCourse();
    } else {
      handleEnrollPremiumCourse();
    }
  };

  const renderItems = ({item, index}: RenderCarousel) => {
    return (
      <View style={styles.carouselItemContainer}>
        <ImageBackground
          source={{uri: item.coverImageURL}}
          style={styles.backgroundImage}
          imageStyle={{borderRadius: 20}}
        />
      </View>
    );
  };

  return (
    <Container verticalHeight={0}>
      <Header onPressBack={navigation.goBack} logoSrc={Logo} />
      <Text style={styles.welcomeText}>Courses</Text>
      {carouselItems.length > 0 && (
        <>
          <Carousel
            ref={carouselRef}
            layout={'default'}
            data={carouselItems}
            sliderWidth={wp('100%')}
            itemWidth={300}
            renderItem={renderItems}
            onSnapToItem={(index: number) => setActiveIndex(index)}
          />
          <Dots
            length={carouselItems && carouselItems.length}
            active={activeIndex}
            activeColor={'#D3D3D3'}
            passiveColor={'#F5F5F5'}
            marginHorizontal={5}
          />
          <View style={styles.textContainer}>
            <Text style={styles.courseName}>
              {carouselItems[activeIndex].name}
            </Text>
            <Text style={styles.description}>
              {carouselItems[activeIndex].description}
            </Text>
            <Text style={styles.price}>
              <Text style={styles.priceInner}>Price: </Text>{' '}
              {carouselItems[activeIndex].formattedPrice} USD
            </Text>
          </View>

          <TouchableOpacity style={styles.enrollBtn} onPress={handleEnroll}>
            <Text style={styles.enrollBtnTxt}>ENROLL NOW</Text>
          </TouchableOpacity>
        </>
      )}
    </Container>
  );
};

export default CarouselView;
