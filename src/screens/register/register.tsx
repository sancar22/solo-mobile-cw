import {View, Image, TouchableOpacity, Text, Alert} from 'react-native';
import React from 'react';
import Signup from '../../components/signup';
import Container from '../../components/container/container';
import styles from './styles';
import colors from '../../constants/colors';
import AuthService from '../../services/auth';
import routes from '../../routes';

type Props = {
  navigation: any;
};

const RegisterView: React.FC<Props> = ({navigation}): JSX.Element => {
  const handleRegister = async (
    name: string,
    email: string,
    password: string,
    passwordRepeat: string,
  ): Promise<void> => {
    // add rn power meter over here
    const {serverRes, error} = await AuthService.handleRegister(
      name,
      email.trim().toLowerCase(),
      password,
      passwordRepeat,
    );
    if (error) {
      Alert.alert(serverRes.data);
    } else {
      Alert.alert(
        serverRes.data,
        'An email was sent in order to verify your account!',
      );
      navigation.reset({
        index: 0,
        routes: [{name: routes.initial}],
      });
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
