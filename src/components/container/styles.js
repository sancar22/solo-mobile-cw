import {StyleSheet} from 'react-native';
import colors from '../../constants/colors';

const styles = StyleSheet.create({
  mainView: {
    backgroundColor: '#ffffff',
    flex: 1,
  },
  view: {
    flex: 1,
  },
  keyboardAwareScrollView: {
    paddingHorizontal: 0,
    flex: 1,
  },
  ayudaButton: {
    backgroundColor: colors.white,
    alignSelf: 'flex-start',
    position: 'absolute',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    borderRadius: 27.5,
    padding: 7,
    bottom: 40,
    right: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});

export default styles;
