import React, {useState, useEffect} from 'react';
import {View, Image, TouchableOpacity, Text, Alert} from 'react-native';
import Container from '../../components/container/container';
import colors from '../../constants/colors';
import styles from './styles';
import AuthService from '../../services/auth';
import Icon from 'react-native-vector-icons/FontAwesome';
// @ts-ignore
import {BarPasswordStrengthDisplay} from 'react-native-password-strength-meter';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {Input} from 'react-native-elements';
import * as SecureStore from 'expo-secure-store';
import routes from '../../routes';

type Props = {
  navigation: any;
};
const PWChangeView: React.FC<Props> = ({navigation}): JSX.Element => {
  const [password, setPassword] = useState<string>('');
  const [passwordRepeat, setPasswordRepeat] = useState<string>('');
  const [pwMatch, setPWMatch] = useState<boolean>(true);

  const handlePWChange = async (): Promise<void> => {
    const jwt = await SecureStore.getItemAsync('jwt');
    const {serverRes, error} = await AuthService.handlePWChange(
      jwt,
      password,
      passwordRepeat,
    );
    if (error) {
      if (serverRes.statusCode === 401) {
        await SecureStore.deleteItemAsync('jwt');
        Alert.alert(serverRes.msg);
        navigation.reset({
          index: 0,
          routes: [{name: routes.initial}],
        });
      }
      if (serverRes.statusCode === 500) {
        Alert.alert(serverRes.msg);
      }
    } else {
      await SecureStore.deleteItemAsync('jwt');
      Alert.alert(serverRes.data);
      navigation.reset({
        index: 0,
        routes: [{name: routes.initial}],
      });
    }
  };

  useEffect(() => {
    if (password !== passwordRepeat) {
      setPWMatch(false);
    } else {
      setPWMatch(true);
    }
  }, [password, passwordRepeat]);

  return (
    <Container backgroundColor={colors.initialBgColor} verticalHeight={0}>
      <TouchableOpacity
        onPress={navigation.goBack}
        style={styles.backTouchable}>
        <Image source={require('../../assets/icons/back-arrow.png')} />
      </TouchableOpacity>
      <View style={styles.body}>
        <Text style={styles.minuteText}>
          You have 2 minutes to change your password!
        </Text>
        <View style={styles.pwContainer}>
          <Input
            placeholder="PASSWORD"
            value={password}
            leftIcon={<Icon name="lock" size={28} color="gray" />}
            onChangeText={value => setPassword(value)}
            secureTextEntry={true}
            containerStyle={styles.containerStyles}
            inputContainerStyle={styles.inputStylesCont}
            inputStyle={{color: 'gray'}}
            style={{fontSize: 14}}
            autoCapitalize="none"
          />
          <BarPasswordStrengthDisplay width={wp('76%')} password={password} />
          {password.length < 6 && password.length > 0 && (
            <Text style={styles.pwNoMatch}>
              Password has to be at least 6 characters long!
            </Text>
          )}
        </View>
        <View style={styles.pwContainer}>
          <Input
            placeholder="REPEAT PASSWORD"
            value={passwordRepeat}
            leftIcon={<Icon name="lock" size={28} color="gray" />}
            onChangeText={value => setPasswordRepeat(value)}
            secureTextEntry={true}
            containerStyle={styles.containerStyles}
            inputContainerStyle={styles.inputStylesCont}
            inputStyle={{color: 'gray'}}
            style={{fontSize: 14}}
            autoCapitalize="none"
          />
          {passwordRepeat !== password && (
            <Text style={styles.pwNoMatch2}>Password don't match!</Text>
          )}
        </View>
        <TouchableOpacity
          disabled={!pwMatch || password.length < 6}
          style={{
            ...styles.loginBtn,
            opacity: !pwMatch || password.length < 6 ? 0.7 : 1,
          }}
          onPress={handlePWChange}>
          <Text style={styles.loginBtnTxt}>CHANGE PW</Text>
        </TouchableOpacity>
      </View>
    </Container>
  );
};

export default PWChangeView;
