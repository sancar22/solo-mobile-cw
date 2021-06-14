import {StyleSheet} from 'react-native';
import colors from '../../constants/colors';

const styles = StyleSheet.create({
  testResultContainer: {
    width: '90%',
    alignSelf: 'center',
    marginBottom: 20,
  },
  title: {
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
  questionContainer: {
    backgroundColor: '#F5F5F5',
    marginBottom: 20,
    padding: 15,
  },
  questionNumber: {
    color: 'rgba(128, 128, 128, 1)',
    fontWeight: '700',
  },
  question: {
    color: 'rgba(128, 128, 128, 1)',
    fontWeight: '400',
    marginBottom: 15,
    marginLeft: 5,
  },
  choices: {
    marginBottom: 10,
    padding: 10,
  },
  iconContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  scoreResults: {
    marginBottom: 20,
  },
});
export default styles;
