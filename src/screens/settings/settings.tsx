import {View, Image, TouchableOpacity, Text, Alert} from 'react-native';
import React, {useContext} from 'react';
import Container from '../../components/container/container';
import styles from './styles';
import colors from '../../constants/colors';
import * as SecureStore from 'expo-secure-store';
import routes from '../../routes';
import {StatusContext, StateContext} from '../../services/context';
import {StateCtx, StatusCtx} from '../../interfaces';

type Props = {
  navigation: any;
};

const SettingsView: React.FC<Props> = ({navigation}): JSX.Element => {
  const {updateUser} = useContext<StateCtx>(StateContext);
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
  return (
    <Container verticalHeight={0}>
      <TouchableOpacity onPress={handleLogout}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </Container>
  );
};

export default SettingsView;
