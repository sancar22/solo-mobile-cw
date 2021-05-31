import {StyleSheet} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import colors from '../../constants/colors';

const styles = StyleSheet.create({
  body: {
    flex: 1,
    width: wp('80%'),
    alignSelf: 'center',
  },
  title: {
    color: 'white',
    fontSize: 40,
    marginBottom: 50,
  },
  containerStyles: {
    backgroundColor: colors.inputBgColor,
    borderRadius: 20,
    marginBottom: 20,
  },
  inputStylesCont: {
    borderBottomWidth: 0,
  },
  forgotPWContainer: {
    display: 'flex',
    alignItems: 'flex-end',
  },
  forgotPW: {
    textAlign: 'right',
    color: colors.initialLinkColors,
    width: 200,
  },
  loginBtn: {
    backgroundColor: colors.initialBtnColor,
    marginRight: 'auto',
    marginLeft: 'auto',
    borderRadius: 30,
    paddingHorizontal: 60,
    paddingVertical: 15,
    marginTop: 50,
  },
  loginBtnTxt: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
export default styles;
