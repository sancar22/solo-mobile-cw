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

const PaymentService = () => {
  const payPremiumCourse = async (
    course: any,
    creditCardDetails: any,
  ): Promise<CustomResponse<any>> => {
    const authConfig = await getAuthConfig();
    return await customFetch<any>(
      'payment/course/premium',
      'POST',
      {course, creditCardDetails},
      authConfig,
    );
  };

  return {
    payPremiumCourse,
  };
};

export default PaymentService();
