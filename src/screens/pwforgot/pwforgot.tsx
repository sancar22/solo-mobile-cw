import {View, Image, TouchableOpacity, Text, Alert} from 'react-native';
import {Input} from 'react-native-elements';
import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Container from '../../components/container/container';
import styles from './styles';
import colors from '../../constants/colors';
import AuthService from '../../services/auth';
import {emailValidator} from '../../utils';

type Props = {
  navigation: any;
};

const PWForgotView: React.FC<Props> = ({navigation}): JSX.Element => {
  const [email, setEmail] = useState<string>('');
  const [emailIsValid, setEmailIsValid] = useState<boolean>(false);

  const handlePWForgot = async (): Promise<void> => {
    const {serverRes, error} = await AuthService.handlePWForgot(email);
    if (error) {
      Alert.alert(serverRes);
    }
  };

  useEffect(() => {
    if (emailValidator(email)) {
      setEmailIsValid(true);
    } else {
      setEmailIsValid(false);
    }
  }, [email]);

  return (
    <Container backgroundColor={colors.initialBgColor} verticalHeight={0}>
      <TouchableOpacity
        onPress={navigation.goBack}
        style={styles.backTouchable}>
        <Image source={require('../../assets/icons/back-arrow.png')} />
      </TouchableOpacity>
      <View style={styles.body}>
        <Text style={styles.mainTitle}>Reset Password</Text>
        <Text style={styles.instructions}>
          Please type your email in the input field below. We'll send you a code
          to reset your password.
        </Text>
        <View style={styles.pwContainer}>
          <Input
            placeholder="EMAIL"
            leftIcon={<Icon name="envelope" size={20} color="gray" />}
            value={email}
            onChangeText={value => setEmail(value)}
            containerStyle={{...styles.containerStyles, marginBottom: 5}}
            inputContainerStyle={styles.inputStylesCont}
            inputStyle={{color: 'gray'}}
            style={{fontSize: 14}}
          />
          {!emailIsValid && email.length > 0 && (
            <Text style={styles.pwNoMatch}>Email is not valid!</Text>
          )}
        </View>
        <TouchableOpacity
          disabled={!emailIsValid}
          style={{
            ...styles.loginBtn,
            opacity: !emailIsValid ? 0.7 : 1,
          }}
          onPress={handlePWForgot}>
          <Text style={styles.loginBtnTxt}>SEND EMAIL</Text>
        </TouchableOpacity>
      </View>
    </Container>
  );
};

export default PWForgotView;
