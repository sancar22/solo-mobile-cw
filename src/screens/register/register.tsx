import {View, Image, TouchableOpacity, Text, Alert} from 'react-native';
import React from 'react';
import Login from '../../components/login';
import Container from '../../components/container/container';
import styles from './styles';
import colors from '../../constants/colors';
import AuthService from '../../services/auth';

const RegisterView = (): JSX.Element => {
  const handleLogin = async (
    email: string,
    password: string,
  ): Promise<void> => {
    const {serverRes, error} = await AuthService.handleLogin(email, password);
    if (error) {
      Alert.alert(serverRes);
    }
  };
  const handleSignUpRoute = (): void => {
    console.log('handle sign up route');
  };
  const handlePassForgotRoute = (): void => {
    console.log('handling password forgot route');
  };
  return (
    <Container backgroundColor={colors.initialBgColor} verticalHeight={0}>
      <TouchableOpacity>
        <Image source={require('../../assets/icons/back-arrow.png')} />
      </TouchableOpacity>
    </Container>
  );
};

export default RegisterView;
