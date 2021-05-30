import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

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
    color: 'rgba(220, 166, 239, 1)',
    width: 120,
    marginLeft: 5,
  },
  noAccountText: {
    color: '#D3D3D3',
  },
});
export default styles;
