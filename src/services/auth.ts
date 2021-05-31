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

  const handleRegister = async (
    name: string,
    email: string,
    password: string,
    passwordRepeat: string,
  ): Promise<CustomResponse<any>> => {
    return await customFetch<any>(
      'auth/register',
      'POST',
      {name, email, password, passwordRepeat},
      config,
    );
  };

  const handlePWForgot = async (
    email: string,
  ): Promise<CustomResponse<any>> => {
    return await customFetch<any>('auth/forgotPW', 'POST', {email}, config);
  };

  const handleCodeSubmit = async (
    email: string,
    code: number,
  ): Promise<CustomResponse<any>> => {
    return await customFetch<any>(
      'auth/verifyEmailCode',
      'POST',
      {email, code},
      config,
    );
  };

  const handlePWChange = async (
    jwt: string | null,
    password: string,
    passwordRepeat: string,
  ): Promise<CustomResponse<any>> => {
    const authConfig = {
      headers: {
        Authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json',
      },
    };
    return await customFetch<any>(
      'auth/changePW',
      'POST',
      {password, passwordRepeat},
      authConfig,
    );
  };

  return {
    handleLogin,
    handleRegister,
    handlePWForgot,
    handleCodeSubmit,
    handlePWChange,
  };
};

export default AuthService();
