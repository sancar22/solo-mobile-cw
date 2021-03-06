import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Input} from 'react-native-elements';
import styles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
// @ts-ignore
import {BarPasswordStrengthDisplay} from 'react-native-password-strength-meter';
import {emailValidator} from '../../utils';

type Props = {
  onSubmit: (
    name: string,
    email: string,
    password: string,
    passwordRepeat: string,
  ) => void;
  handlePassForgotRoute?: () => void;
};

const Signup: React.FC<Props> = ({onSubmit}): JSX.Element => {
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [nameTouched, setNameTouched] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [passwordRepeat, setPasswordRepeat] = useState<string>('');
  const [pwMatch, setPWMatch] = useState<boolean>(true);
  const [emailIsValid, setEmailIsValid] = useState<boolean>(false);

  useEffect(() => {
    if (password !== passwordRepeat) {
      setPWMatch(false);
    } else {
      setPWMatch(true);
    }
  }, [password, passwordRepeat]);

  useEffect(() => {
    if (emailValidator(email)) {
      setEmailIsValid(true);
    } else {
      setEmailIsValid(false);
    }
  }, [email]);

  return (
    <View style={styles.body}>
      <Text style={styles.title}>{'<SIGN UP/>'}</Text>
      <View style={styles.pwContainer}>
        <Input
          placeholder="NAME"
          leftIcon={<Icon name="envelope" size={20} color="gray" />}
          value={name}
          onChangeText={value => setName(value)}
          containerStyle={{...styles.containerStyles, marginBottom: 5}}
          inputContainerStyle={styles.inputStylesCont}
          inputStyle={{color: 'gray'}}
          style={{fontSize: 14}}
          onTouchStart={() => setNameTouched(true)}
        />
        {name.trim().length === 0 && nameTouched && (
          <Text style={styles.pwNoMatch}>Enter a name!</Text>
        )}
      </View>
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
          <Text style={styles.pwNoMatch}>Password don't match!</Text>
        )}
      </View>
      <TouchableOpacity
        disabled={
          !pwMatch ||
          !emailIsValid ||
          password.length < 6 ||
          name.trim().length === 0
        }
        style={{
          ...styles.loginBtn,
          opacity:
            !pwMatch ||
            !emailIsValid ||
            password.length < 6 ||
            name.trim().length === 0
              ? 0.7
              : 1,
        }}
        onPress={() => onSubmit(name, email, password, passwordRepeat)}>
        <Text style={styles.loginBtnTxt}>SIGN UP</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Signup;
