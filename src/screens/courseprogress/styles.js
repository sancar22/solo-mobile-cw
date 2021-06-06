import {StyleSheet} from 'react-native';
import colors from '../../constants/colors';

const styles = StyleSheet.create({
  coursesContainer: {
    width: '80%',
    alignSelf: 'center',
    marginBottom: 20,
  },
  courseContainer: {
    backgroundColor: '#F5F5F5',
    marginBottom: 20,
    display: 'flex',
    flexDirection: 'row',
    padding: 20,
    width: '100%',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 30,
    marginBottom: 20,
  },
  courseName: {
    fontWeight: 'bold',
    fontSize: 20,
    textTransform: 'uppercase',
    color: 'rgba(128, 128, 128, 1)',
  },
  detailsContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    flex: 1,
    paddingLeft: 15,
  },
  completion: {
    color: 'rgba(128, 128, 128, 1)',
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
