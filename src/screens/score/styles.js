import {StyleSheet} from 'react-native';
import colors from '../../constants/colors';

const styles = StyleSheet.create({
  scoreContainer: {
    width: '90%',
    alignSelf: 'center',
    paddingVertical: 20,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 30,
    marginBottom: 50,
    color: 'rgba(0, 0, 0, 1)',
  },
  infoContainer: {
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    marginTop: 30,
  },
  scoreInfo: {
    color: 'rgba(128, 128, 128, 1)',
    fontWeight: '400',
    marginBottom: 10,
    fontSize: 18,
  },
  text: {
    color: 'rgba(128, 128, 128, 1)',
    paddingVertical: 15,
    fontWeight: '400',
    borderBottomColor: '#D3D3D3',
    borderBottomWidth: 2,
    marginLeft: 10,
  },
  subtext: {
    color: 'rgba(128, 128, 128, 1)',
    fontWeight: '700',
  },
  exitBtn: {
    backgroundColor: '#50D65D',
    marginRight: 'auto',
    marginLeft: 'auto',
    borderRadius: 30,
    paddingHorizontal: 40,
    paddingVertical: 15,
    marginTop: 50,
  },
  exitBtnTxt: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default styles;
