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

const UserService = () => {
  const getUserInfo = async (): Promise<CustomResponse<any>> => {
    const authConfig = await getAuthConfig();
    return await customFetch<any>('user/getInfo', 'GET', '', authConfig);
  };

  return {
    getUserInfo,
  };
};

export default UserService();
