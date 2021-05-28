import {Dimensions, StyleSheet} from 'react-native';
import colors from '../../constants/colors';

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 99,
  },
  container: {
    backgroundColor: colors.white,
    paddingHorizontal: 30,
    paddingTop: 20,
    paddingBottom: 25,
    borderRadius: 10,
    width: '80%',
  },
  title: {
    color: colors.textColorDark,
    fontWeight: 'bold',
    fontSize: 18,
  },
  text: {
    color: colors.textColor,
    fontSize: 16,
    marginLeft: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default styles;
