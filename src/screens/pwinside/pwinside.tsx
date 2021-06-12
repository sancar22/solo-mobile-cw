import {View, TouchableOpacity, Text, Alert} from 'react-native';
import React, {useState, useContext} from 'react';
import Container from '../../components/container/container';
import styles from './styles';
import {StateContext, StatusContext} from '../../services/context';
import {StateCtx, StatusCtx} from '../../interfaces';
import * as SecureStore from 'expo-secure-store';
import AuthService from '../../services/auth';
import routes from '../../routes';
import Header from '../../components/header/header';
import {Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
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
      Alert.alert(serverRes.data);
    }
  };

  return (
    <Container verticalHeight={0}>
      <Header onPressBack={navigation.goBack} />
      <View style={styles.coursesContainer}>
        <Text style={styles.title}>Change Password</Text>
        <Input
          placeholder="Old password"
          leftIcon={<Icon name="lock" size={20} color="gray" />}
          value={oldPassword}
          secureTextEntry={true}
          onChangeText={value => setOldPassword(value)}
          containerStyle={{...styles.containerStyles, marginBottom: 20}}
          inputContainerStyle={styles.inputStylesCont}
          inputStyle={{color: 'gray'}}
          style={{fontSize: 14}}
          autoCapitalize="none"
        />
        <Input
          placeholder="New password"
          leftIcon={<Icon name="lock" size={20} color="gray" />}
          value={password}
          secureTextEntry={true}
          onChangeText={value => setPassword(value)}
          containerStyle={{...styles.containerStyles, marginBottom: 20}}
          inputContainerStyle={styles.inputStylesCont}
          inputStyle={{color: 'gray'}}
          style={{fontSize: 14}}
          autoCapitalize="none"
        />
        <Input
          placeholder="Repeat new password"
          leftIcon={<Icon name="lock" size={20} color="gray" />}
          value={newPassword}
          secureTextEntry={true}
          onChangeText={value => setNewPassword(value)}
          containerStyle={{...styles.containerStyles, marginBottom: 0}}
          inputContainerStyle={styles.inputStylesCont}
          inputStyle={{color: 'gray'}}
          style={{fontSize: 14}}
          autoCapitalize="none"
        />
        <TouchableOpacity
          style={styles.enrollBtn}
          onPress={handlePasswordChange}>
          <Text style={styles.enrollBtnTxt}>CHANGE PASSWORD</Text>
        </TouchableOpacity>
      </View>
    </Container>
  );
};

export default PWInsideView;
