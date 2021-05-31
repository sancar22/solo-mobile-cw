import React, {useState} from 'react';
import {View, Image, TouchableOpacity, Text, Alert} from 'react-native';
import CodeGrids from '../../components/codeField/index';
import Container from '../../components/container/container';
import colors from '../../constants/colors';
import styles from './styles';
import AuthService from '../../services/auth';
import routes from '../../routes';
import * as SecureStore from 'expo-secure-store';

type Props = {
  navigation: any;
  route: {params: {email: string}};
};
const PWCodeView: React.FC<Props> = ({navigation, route}): JSX.Element => {
  const {email} = route.params;

  const [code, setCode] = useState<string>('');

  const handleCodeSubmit = async (): Promise<void> => {
    const {serverRes, error} = await AuthService.handleCodeSubmit(
      email,
      parseInt(code, 10),
    );
    if (!error && serverRes.data.token) {
      await SecureStore.setItemAsync('jwt', serverRes.data.token);
      navigation.navigate(routes.pwchange);
    } else {
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
      <View style={styles.body}>
        <CodeGrids onChangeCode={setCode} title="Enter your 6 digit code!" />
        <Text style={styles.pwNoMatch}>
          You have one minute before your code expires!
        </Text>
        <TouchableOpacity
          disabled={code.length !== 6}
          style={{
            ...styles.loginBtn,
            opacity: code.length !== 6 ? 0.7 : 1,
          }}
          onPress={handleCodeSubmit}>
          <Text style={styles.loginBtnTxt}>SUBMIT</Text>
        </TouchableOpacity>
      </View>
    </Container>
  );
};

export default PWCodeView;
