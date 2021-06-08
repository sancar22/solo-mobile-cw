import {View, Image, TouchableOpacity, Text, Alert} from 'react-native';
import React, {useEffect, useState, useContext} from 'react';
import Container from '../../components/container/container';
import styles from './styles';
import {StateContext, StatusContext} from '../../services/context';
import {StateCtx, StatusCtx} from '../../interfaces';
import * as SecureStore from 'expo-secure-store';
import AuthService from '../../services/auth';
import routes from '../../routes';
import ProgressBar from '../../components/progressBar';
import Header from '../../components/header/header';
import Logo from '../../assets/icons/back-arrow.png';
type Props = {
  navigation: any;
};

const PWInsideView: React.FC<Props> = ({navigation}): JSX.Element => {
  const [oldPassword, setOldPassword] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');

  const {updateUser} = useContext<StateCtx>(StateContext);
  const {showProgressDialog, hideProgressDialog} =
    useContext<StatusCtx>(StatusContext);

  const handlePasswordChange = async () => {
    showProgressDialog();
    const jwt = await SecureStore.getItemAsync('session');
    const {serverRes, error} = await AuthService.changePasswordInApp(
      jwt,
      oldPassword,
      password,
      newPassword,
    );
    hideProgressDialog();
    if (!error) {
      Alert.alert(serverRes.data);
      navigation.reset({
        index: 0,
        routes: [{name: routes.home}],
      });
    }
    if (serverRes?.status === 401) {
      await SecureStore.deleteItemAsync('session');
      updateUser({});
      navigation.reset({
        index: 0,
        routes: [{name: routes.initial}],
      });
    }
    if (error) {
      Alert.alert(serverRes?.data?.msg);
    }
  };

  return (
    <Container verticalHeight={0}>
      <Header logoSrc={Logo} onPressBack={navigation.goBack} />
      <View style={styles.coursesContainer} />
    </Container>
  );
};

export default PWInsideView;
