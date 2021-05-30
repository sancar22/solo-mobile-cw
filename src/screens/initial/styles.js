import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  matrixImg: {
    height: hp('15%'),
    marginBottom: 30,
  },
  signUpContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginRight: 'auto',
    marginLeft: 'auto',
    justifyContent: 'center',
    marginTop: 30,
  },
  signUp: {
    color: colors.initialLinkColors,
    width: 120,
    marginLeft: 5,
  },
  noAccountText: {
    color: colors.noAccColor,
  },
});
export default styles;
