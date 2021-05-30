import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../constants/colors';

const styles = StyleSheet.create({
  backTouchable: {
    width: 70,
    height: 60,
    marginTop: 20,
    marginLeft: 20,
  },
  loginContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginRight: 'auto',
    marginLeft: 'auto',
    justifyContent: 'center',
    marginTop: 30,
  },
  login: {
    color: colors.initialLinkColors,
    width: 50,
    marginLeft: 5,
  },
  accountText: {
    color: colors.noAccColor,
  },
});
export default styles;
