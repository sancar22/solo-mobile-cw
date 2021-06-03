import {View, Image, TouchableOpacity, Text, Alert} from 'react-native';
import React, {useContext, useEffect} from 'react';
import Login from '../../components/login';
import Container from '../../components/container/container';
import styles from './styles';
import colors from '../../constants/colors';
import AuthService from '../../services/auth';
import UserService from '../../services/user';
import routes from '../../routes';
import * as SecureStore from 'expo-secure-store';
import {StateContext, StatusContext} from '../../services/context';
import {StateCtx, StatusCtx} from '../../interfaces';

type Props = {
  navigation: any;
};

const InitialView: React.FC<Props> = ({navigation}): JSX.Element => {
  const {updateUser} = useContext<StateCtx>(StateContext);
  const {showProgressDialog, hideProgressDialog} =
    useContext<StatusCtx>(StatusContext);

  const handleGetUserInfo = async () => {
    const {serverRes: serverResInfo, error: errorInfo} =
      await UserService.getUserInfo();
    if (errorInfo) {
      await SecureStore.deleteItemAsync('session');
      updateUser({});
      hideProgressDialog();
    } else {
      updateUser(serverResInfo.data);
      hideProgressDialog();
      navigation.reset({
        index: 0,
        routes: [{name: routes.home}],
      });
    }
  };

  const handleLogin = async (
    email: string,
    password: string,
  ): Promise<void> => {
    showProgressDialog();
    const {serverRes, error} = await AuthService.handleLogin(
      email.trim().toLowerCase(),
      password,
    );
    if (error) {
      Alert.alert(serverRes.data);
      hideProgressDialog();
    } else {
      await SecureStore.setItemAsync('session', serverRes.data.token);
      handleGetUserInfo();
    }
  };

  useEffect(() => {
    const checkToken = async () => {
      showProgressDialog();
      const sessionToken = await SecureStore.getItemAsync('session');
      if (sessionToken) {
        handleGetUserInfo();
      }
      hideProgressDialog();
    };
    checkToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Container backgroundColor={colors.initialBgColor} verticalHeight={0}>
      <View style={styles.container}>
        <Image
          style={styles.matrixImg}
          source={require('../../assets/images/matrix.png')}
        />
        <Login
          onSubmit={handleLogin}
          handlePassForgotRoute={() => navigation.navigate(routes.forgot)}
        />
        <View style={styles.signUpContainer}>
          <Text style={styles.noAccountText}>Don't have an account yet?</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate(routes.register)}>
            <Text style={styles.signUp}>SIGN UP HERE</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Container>
  );
};

export default InitialView;
