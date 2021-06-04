import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../constants/colors';

const styles = StyleSheet.create({
  body: {
    justifyContent: 'center',
    flex: 1,
  },
  welcomeText: {
    textAlign: 'center',
    color: 'rgba(0, 0, 0, 1)',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  searchInput: {
    width: wp('80%'),
    alignSelf: 'center',
    display: 'flex',
    marginLeft: 10,
    backgroundColor: 'rgba(245, 245, 245, 1)',
    borderRadius: 20,
    marginBottom: 20,
  },
  backgroundContainer: {
    width: wp('80%'),
    height: 130,
    alignSelf: 'center',
    zIndex: 10,
    marginBottom: 20,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  textBackground: {
    fontSize: 20,
    color: colors.white,
    fontWeight: 'bold',
  },
  nameLock: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  dropDown: {
    backgroundColor: '#fafafa',
    width: 200,
    marginLeft: wp('10%'),
  },
  dropDownStyle: {
    backgroundColor: '#fafafa',
    width: wp('35%'),
    marginLeft: wp('10%'),
  },
  wholeTextContainer: {
    display: 'flex',
    height: '100%',
    justifyContent: 'space-between',
  },
  priceCont: {
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  textPrice: {
    color: colors.white,
    fontWeight: 'bold',
  },
  filterContainer: {
    width: wp('80%'),
    alignSelf: 'center',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterText: {
    fontWeight: 'bold',
    marginRight: 10,
  },
});

export default styles;
