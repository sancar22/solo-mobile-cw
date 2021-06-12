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
    marginBottom: 40,
  },
  containerStyles: {
    backgroundColor: 'rgba(245, 245, 245, 1)',
    borderRadius: 20,
  },
  inputStylesCont: {
    borderBottomWidth: 0,
    color: 'rgba(128, 128, 128, 1)',
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
