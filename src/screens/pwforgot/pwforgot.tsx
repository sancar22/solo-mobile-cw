import {View, Image, TouchableOpacity, Text, Alert} from 'react-native';
import React from 'react';
import Container from '../../components/container/container';
import styles from './styles';
import colors from '../../constants/colors';
import AuthService from '../../services/auth';

type Props = {
  navigation: any;
};

const PWForgotView: React.FC<Props> = ({navigation}): JSX.Element => {
  const handleLogin = async (
    email: string,
    password: string,
  ): Promise<void> => {
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
    </Container>
  );
};

export default PWForgotView;
