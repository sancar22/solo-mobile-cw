import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../constants/colors';

const styles = StyleSheet.create({
  formContainer: {
    width: wp('90%'),
    alignSelf: 'center',
  },
  welcomeText: {
    color: 'rgba(0, 0, 0, 1)',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 50,
    width: wp('90%'),
    alignSelf: 'center',
  },
  priceTag: {
    color: 'rgba(179, 80, 214, 1)',
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 50,
  },
  payBtn: {
    backgroundColor: '#50D65D',
    marginRight: 'auto',
    marginLeft: 'auto',
    borderRadius: 30,
    paddingHorizontal: 60,
    paddingVertical: 15,
    marginTop: 70,
  },
  payBtnTxt: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default styles;
