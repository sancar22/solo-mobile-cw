import {StyleSheet} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import colors from '../../constants/colors';

const styles = StyleSheet.create({
  infoContainer: {
    width: '90%',
    alignSelf: 'center',
    paddingVertical: 20,
  },
  purpleView: {
    backgroundColor: 'rgba(21, 12, 37, 1)',
    height: hp('40%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  nameColor: {
    color: 'white',
    fontWeight: '500',
    fontSize: 30,
  },
  emailContainer: {
    color: 'rgba(128, 128, 128, 1)',
    marginBottom: 40,
    marginTop: 30,
    fontSize: 15,
  },
  emailText: {
    color: 'rgba(128, 128, 128, 1)',
    fontWeight: '800',
  },
  purpleText: {
    color: 'rgba(179, 80, 214, 1)',
    fontWeight: '700',
    marginBottom: 20,
  },
  changePW: {
    width: 200,
  },
  logout: {
    width: 130,
  },
});
export default styles;
