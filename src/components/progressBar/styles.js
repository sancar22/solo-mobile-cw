import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  progressBarContainer: {
    width: '120%',
  },
  wholeProgressBar: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'center',
    height: 5,
  },
  complete: {
    backgroundColor: 'rgba(179, 80, 214, 1)',
    height: 5,
    borderRadius: 20,
    position: 'absolute',
  },
  progress: {
    backgroundColor: 'rgba(31,225,197,0.43)',
    height: 5,
    borderRadius: 20,
    position: 'absolute',
  },
  toFinish: {
    backgroundColor: 'rgba(179, 80, 214, 0.3)',
    height: 5,
    borderRadius: 20,
    position: 'absolute',
  },
  percentageShower: {
    width: 100,
    alignSelf: 'center',
    minHeight: 100,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  stateContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: wp('28.33%'),
    alignItems: 'center',
  },
  colorCircle1: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#1FE1C5',
    marginRight: 10,
  },
  colorCircle2: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(31,225,197,0.43)',
    marginRight: 10,
  },
  colorCircle3: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(31,225,197,0.13)',
    marginRight: 10,
  },
});

export default styles;
