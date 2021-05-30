import {View, Image, TouchableOpacity, Text, Alert} from 'react-native';
import React from 'react';
import Signup from '../../components/signup';
import Container from '../../components/container/container';
import styles from './styles';
import colors from '../../constants/colors';
import AuthService from '../../services/auth';
import {emailValidator} from '../../utils';

const RegisterView = ({navigation}): JSX.Element => {
  const handleRegister = async (
    email: string,
    password: string,
    passwordRepeat: string,
  ): Promise<void> => {
    // add rn power meter over here
    const {serverRes, error} = await AuthService.handleLogin(email, password);
    if (error) {
      Alert.alert(serverRes);
    }
  };
  return (
    <Container backgroundColor={colors.initialBgColor} verticalHeight={0}>
      <TouchableOpacity
        onPress={navigation.goBack}
        style={styles.backTouchable}>
        <Image source={require('../../assets/icons/back-arrow.png')} />
      </TouchableOpacity>
      <Signup onSubmit={handleRegister} />
      <View style={styles.loginContainer}>
        <Text style={styles.accountText}>Already have an account?</Text>
        <TouchableOpacity onPress={navigation.goBack}>
          <Text style={styles.login}>LOGIN</Text>
        </TouchableOpacity>
      </View>
    </Container>
  );
};

export default RegisterView;
