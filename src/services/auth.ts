import {CustomResponse} from '../interfaces';
import {customFetch} from './fetch';

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};

const AuthService = () => {
  const handleLogin = async (
    email: string,
    password: string,
  ): Promise<CustomResponse<any>> => {
    return await customFetch<any>(
      'auth/login',
      'POST',
      {email, password},
      config,
    );
  };

  return {
    handleLogin,
  };
};

export default AuthService();
