import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../constants/colors';

const styles = StyleSheet.create({
  body: {flex: 1, backgroundColor: '#F8F8F8'},
  backArrow: {
    width: 34,
    marginTop: hp('5%'),
    marginLeft: wp('10%'),
  },
  welcomeText: {
    color: 'rgba(0, 0, 0, 1)',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    width: wp('90%'),
    alignSelf: 'center',
  },
  textContainer: {
    width: wp('90%'),
    alignSelf: 'center',
  },
  courseName: {
    color: 'rgba(128, 128, 128, 1)',
    fontWeight: 'bold',
    fontSize: 20,
    textTransform: 'uppercase',
    marginBottom: 20,
    marginTop: 30,
  },
  description: {
    color: 'rgba(128, 128, 128, 1)',
    fontSize: 16,
    marginBottom: 20,
  },
  price: {
    color: 'rgba(128, 128, 128, 1)',
    fontSize: 16,
    marginBottom: 20,
  },
  priceInner: {
    color: 'rgba(128, 128, 128, 1)',
    fontSize: 16,
    fontWeight: 'bold',
  },
  carouselItemContainer: {
    backgroundColor: 'rgba(235,235,235,1)',
    borderRadius: 20,
    height: hp('20%'),
    width: wp('70%'),
    marginLeft: 0,
    marginRight: 30,
    marginTop: 30,
    marginBottom: 10,
  },
  backgroundImage: {
    width: wp('70%'),
    height: hp('20%'),
    justifyContent: 'center',
  },
  textBackground: {
    fontSize: 20,
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  enrollBtn: {
    backgroundColor: '#50D65D',
    marginRight: 'auto',
    marginLeft: 'auto',
    borderRadius: 30,
    paddingHorizontal: 40,
    paddingVertical: 15,
    marginTop: 50,
  },
  enrollBtnTxt: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default styles;
