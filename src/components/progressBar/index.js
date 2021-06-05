import React from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import styles from './styles';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

export default function ProgressBar({completed, toFinish, ...props}) {
  return (
    <View style={styles.progressBarContainer}>
      <View style={styles.wholeProgressBar}>
        <View
          style={{
            ...styles.complete,
            width: wp(`${(completed * 0.85).toString()}%`),
          }}
        />
        <View
          style={{
            ...styles.toFinish,
            width: wp('85%'),
          }}
        />
      </View>
      <View style={styles.percentageShower}>
        <View style={styles.stateContainer}>
          <View style={styles.colorCircle1} />
          <View style={styles.infoContainer}>
            <Text style={{fontWeight: 'bold'}}>{completed.toFixed(2)}% </Text>
            <Text style={{color: '#8D8D8D'}}>Completed</Text>
          </View>
        </View>
        <View style={styles.stateContainer}>
          <View style={styles.colorCircle3} />
          <View style={styles.infoContainer}>
            <Text style={{fontWeight: 'bold'}}>{toFinish.toFixed(2)}% </Text>
            <Text style={{color: '#8D8D8D'}}>To Finish</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

ProgressBar.propTypes = {
  completed: PropTypes.number.isRequired,
  toFinish: PropTypes.number.isRequired,
};

ProgressBar.defaultProps = {
  completed: 0,
  toFinish: 100,
};
