import {StyleSheet} from 'react-native';
import colors from '../../constants/colors';

const styles = StyleSheet.create({
  coursesContainer: {
    width: '80%',
    alignSelf: 'center',
    marginBottom: 20,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 26,
    marginBottom: 20,
    textTransform: 'uppercase',
  },
  topicContainer: {
    backgroundColor: '#F5F5F5',
    padding: 10,
  },
  topicName: {
    marginBottom: 10,
    fontWeight: '500',
    fontSize: 20,
    color: 'rgba(128, 128, 128, 1)',
  },
  topicDescription: {
    color: 'rgba(128, 128, 128, 1)',
    fontWeight: '400',
    marginBottom: 10,
  },
  topicTestResults: {
    color: 'rgba(75, 219, 62, 1)',
    fontWeight: '500',
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
