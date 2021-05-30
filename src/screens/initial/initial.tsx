import {View, Image, TouchableOpacity, Text, Alert} from 'react-native';
import {StatusContext} from '../../services/context';
import React, {useContext} from 'react';
import {StatusCtx} from '../../interfaces/index';
import Login from '../../components/login';
import Container from '../../components/container/container';
import styles from './styles';
import {emailValidator} from '../../utils/index';

const InitialView = (): JSX.Element => {
  const {showProgressDialog, hideProgressDialog} =
    useContext<StatusCtx>(StatusContext);
  const handleLogin = (email: string, password: string) => {
    if (!emailValidator(email)) {
      Alert.alert('Invalid email format');
    } else {
      console.log('valid');
    }
    console.log(email, password, 'hey');
  };
  const handleSignUpRoute = () => {
    console.log('handle sign up route');
  };
  const handlePassForgotRoute = () => {
    console.log('handling password forgot route');
  };
  return (
    <Container backgroundColor={'#150C25'} verticalHeight={0}>
      <View style={styles.container}>
        <Image
          style={styles.matrixImg}
          source={require('../../assets/images/matrix.png')}
        />
        <Login
          onSubmit={handleLogin}
          handlePassForgotRoute={handlePassForgotRoute}
        />
        <View style={styles.signUpContainer}>
          <Text style={styles.noAccountText}>Don't have an account yet?</Text>
          <TouchableOpacity onPress={handleSignUpRoute}>
            <Text style={styles.signUp}>SIGN UP HERE</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Container>
  );
};

export default InitialView;
