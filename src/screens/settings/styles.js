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
    paddingHorizontal: 20,
  },
  nameColor: {
    color: 'white',
    fontWeight: '500',
    fontSize: 30,
    textTransform: 'capitalize',
    textAlign: 'center',
  },
  emailContainer: {
    color: 'rgba(128, 128, 128, 1)',
    marginBottom: 40,
    marginTop: 30,
    fontSize: 16,
  },
  emailText: {
    color: 'rgba(128, 128, 128, 1)',
    fontWeight: '800',
  },
  purpleText: {
    color: 'rgba(179, 80, 214, 1)',
    fontWeight: '700',
    marginBottom: 20,
    fontSize: 16,
  },
  changePW: {
    width: 200,
  },
  logout: {
    width: 130,
  },
});
export default styles;
