import React, {useState, useContext} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  UIManager,
  Platform,
  Alert,
} from 'react-native';
import Container from '../../components/container/container';
import styles from './styles';
import Header from '../../components/header/header';
import Logo from '../../assets/icons/back-arrow.png';
import {alertWithOptions} from '../../helperFunctions/index';
import {CreditCardInput} from 'react-native-credit-card-input';
import {StatusContext, StateContext} from '../../services/context';
import {StatusCtx, StateCtx} from '../../interfaces';
import PaymentService from '../../services/payment';
import * as SecureStore from 'expo-secure-store';
import routes from '../../routes';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

type Props = {
  navigation: any;
  route: {params: {course: any}};
};
const PaymentView: React.FC<Props> = ({navigation, route}): JSX.Element => {
  const {course} = route.params;

  const [inputsAreValid, setInputsAreValid] = useState<boolean>(false);
  const [creditCardDetails, setCreditCardDetails] = useState({});
  const {updateUser} = useContext<StateCtx>(StateContext);
  const {showProgressDialog, hideProgressDialog} =
    useContext<StatusCtx>(StatusContext);

  const handlePayment = async () => {
    showProgressDialog();
    const {serverRes, error} = await PaymentService.payPremiumCourse(
      course,
      creditCardDetails,
    );
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
    if (error && serverRes?.status === 401) {
      Alert.alert(serverRes?.data?.msg);
    }
    if (error && serverRes?.status !== 401) {
      Alert.alert(serverRes.data.errors.raw.message);
    }

    hideProgressDialog();
  };

  const confirmationAlert = () => {
    alertWithOptions(
      'This course is premium!',
      'Are you sure you want to proceed?',
      'No',
      () => {},
      'Yes',
      handlePayment,
    );
  };

  console.log(creditCardDetails);

  const handleCreditCardChange = (v: any) => {
    const {cvc, expiry, number, type} = v.values;
    setCreditCardDetails({cvc, expiry, number, type});
    if (v.valid) {
      setInputsAreValid(true);
    } else {
      setInputsAreValid(false);
    }
  };

  return (
    <Container verticalHeight={0}>
      <Header onPressBack={navigation.goBack} logoSrc={Logo} />
      <Text style={styles.welcomeText}>Payment</Text>
      <View style={styles.formContainer}>
        <Text style={styles.priceTag}>
          Total Price: {course.formattedPrice} USD
        </Text>
        <CreditCardInput onChange={handleCreditCardChange} />
        <TouchableOpacity
          disabled={!inputsAreValid}
          style={{...styles.payBtn, opacity: !inputsAreValid ? 0.7 : 1}}
          onPress={confirmationAlert}>
          <Text style={styles.payBtnTxt}>PAY</Text>
        </TouchableOpacity>
      </View>
    </Container>
  );
};

export default PaymentView;
