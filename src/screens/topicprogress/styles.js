import {StyleSheet} from 'react-native';
import colors from '../../constants/colors';

const styles = StyleSheet.create({
  coursesContainer: {
    width: '90%',
    alignSelf: 'center',
    marginBottom: 20,
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 26,
    marginBottom: 20,
  },
  courseName: {
    marginBottom: 20,
    fontWeight: 'bold',
    fontSize: 20,
  },
  testBtn: {
    backgroundColor: '#50D65D',
    marginRight: 'auto',
    marginLeft: 'auto',
    borderRadius: 30,
    paddingHorizontal: 40,
    paddingVertical: 15,
    marginTop: 10,
    marginBottom: 20,
  },
  testBtnTxt: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  noContent: {
    fontSize: 30,
    alignSelf: 'center',
    color: 'gray',
    fontWeight: 'bold',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});
export default styles;
