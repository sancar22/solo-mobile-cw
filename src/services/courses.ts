import {CustomResponse} from '../interfaces';
import {customFetch} from './fetch';
import * as SecureStore from 'expo-secure-store';

const getAuthConfig = async () => {
  const jwt = await SecureStore.getItemAsync('session');
  const authConfig = {
    headers: {
      Authorization: `Bearer ${jwt}`,
      'Content-Type': 'application/json',
    },
  };
  return authConfig;
};

const CourseService = () => {
  const getActiveCourses = async (): Promise<CustomResponse<any>> => {
    const authConfig = await getAuthConfig();
    return await customFetch<any>(
      'course/client-side/allCourses',
      'GET',
      '',
      authConfig,
    );
  };

  const enrollFreeCourse = async (
    course: any,
  ): Promise<CustomResponse<any>> => {
    const authConfig = await getAuthConfig();
    return await customFetch<any>(
      'course/enroll/free',
      'POST',
      {course},
      authConfig,
    );
  };

  return {
    getActiveCourses,
    enrollFreeCourse,
  };
};

export default CourseService();
