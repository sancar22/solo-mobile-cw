import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

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
    backgroundColor: 'rgba(72, 59, 96, 0.7)',
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
    color: 'rgba(220, 166, 239, 1)',
    width: 200,
  },
  loginBtn: {
    backgroundColor: '#B350D6',
    marginRight: 'auto',
    marginLeft: 'auto',
    borderRadius: 30,
    paddingHorizontal: 60,
    paddingVertical: 15,
    marginTop: 50,
  },
  loginBtnTxt: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
export default styles;
