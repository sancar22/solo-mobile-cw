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
    alignSelf: 'center',
    borderColor: colors.black,
    borderWidth: 2,
    zIndex: 10,
    marginBottom: 20,
  },
  backgroundImage: {
    height: 130,
    padding: 20,
  },
  textBackground: {
    fontSize: 20,
    color: colors.black,
    fontWeight: 'bold',
  },
});

export default styles;
