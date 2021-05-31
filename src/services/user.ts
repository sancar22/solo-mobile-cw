import {CustomResponse} from '../interfaces';
import {customFetch} from './fetch';
import * as SecureStore from 'expo-secure-store';

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};

const UserService = () => {
  const getUserInfo = async (): Promise<CustomResponse<any>> => {
    const jwt = await SecureStore.getItemAsync('session');
    console.log(jwt, 'jwt here');
    const authConfig = {
      headers: {
        Authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json',
      },
    };
    return await customFetch<any>('user/getInfo', 'GET', '', authConfig);
  };

  return {
    getUserInfo,
  };
};

export default UserService();
