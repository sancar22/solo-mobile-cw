import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Input} from 'react-native-elements';
import styles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';

type Props = {
  onSubmit: (email: string, password: string) => void;
  handlePassForgotRoute?: () => void;
};

const Login: React.FC<Props> = ({
  onSubmit,
  handlePassForgotRoute,
}): JSX.Element => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  return (
    <View style={styles.body}>
      <Text style={styles.title}>{'<LOGIN/>'}</Text>
      <Input
        placeholder="EMAIL"
        leftIcon={<Icon name="envelope" size={20} color="gray" />}
        value={email}
        onChangeText={value => setEmail(value)}
        containerStyle={{...styles.containerStyles, marginBottom: 40}}
        inputContainerStyle={styles.inputStylesCont}
        inputStyle={{color: 'gray'}}
        style={{fontSize: 14}}
      />
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
      />
      <View
        style={{
          ...styles.forgotPWContainer,
          display: !handlePassForgotRoute ? 'none' : 'flex',
        }}>
        <TouchableOpacity onPress={handlePassForgotRoute}>
          <Text style={styles.forgotPW}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.loginBtn}
        onPress={() => onSubmit(email, password)}>
        <Text style={styles.loginBtnTxt}>LOGIN</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
