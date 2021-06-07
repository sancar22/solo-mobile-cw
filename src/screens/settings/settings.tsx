import {View, Image, TouchableOpacity, Text, Alert} from 'react-native';
import React, {useContext} from 'react';
import Container from '../../components/container/container';
import styles from './styles';
import * as SecureStore from 'expo-secure-store';
import routes from '../../routes';
import {StatusContext, StateContext} from '../../services/context';
import {StateCtx, StatusCtx} from '../../interfaces';
import Header from '../../components/header/header';
import Logo from '../../assets/icons/back-arrow.png';

type Props = {
  navigation: any;
};

const SettingsView: React.FC<Props> = ({navigation}): JSX.Element => {
  const {updateUser, user} = useContext<StateCtx>(StateContext);
  const {showProgressDialog, hideProgressDialog} =
    useContext<StatusCtx>(StatusContext);

  const handleLogout = async () => {
    showProgressDialog();
    await SecureStore.deleteItemAsync('session');
    updateUser({});
    hideProgressDialog();
    navigation.reset({
      index: 0,
      routes: [{name: routes.initial}],
    });
  };

  const handleChangePassword = () => {};
  return (
    <Container verticalHeight={0}>
      <Header logoSrc={Logo} backArrow={false} defaultMarginBottom={0} />
      <View style={styles.purpleView}>
        <Text style={styles.nameColor}>{user.name}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.emailContainer}>
          <Text style={styles.emailText}>Email:</Text> {user.email}
        </Text>
        <TouchableOpacity
          style={styles.changePW}
          onPress={handleChangePassword}>
          <Text style={styles.purpleText}>Change Password</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.logout} onPress={handleLogout}>
          <Text style={styles.purpleText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </Container>
  );
};

export default SettingsView;
