import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../constants/colors';

const styles = StyleSheet.create({
  topicContainer: {
    width: wp('90%'),
    alignSelf: 'center',
    marginBottom: 20,
  },
  topicName: {
    fontWeight: 'bold',
    fontSize: 26,
    marginBottom: 20,
  },
  topicDescription: {
    fontSize: 16,
  },
  topicBtn: {
    backgroundColor: '#50D65D',
    borderRadius: 30,
    paddingVertical: 15,
    marginTop: 30,
    width: 150,
  },
  topicBtnTxt: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});

export default styles;
