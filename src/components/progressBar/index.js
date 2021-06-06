import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import styles from './styles';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

export default function ProgressBar({completed, toFinish, ...props}) {
  return (
    <View style={styles.progressBarContainer}>
      <View style={styles.wholeProgressBar}>
        <View
          style={{
            ...styles.complete,
            width: `${(completed * 0.85).toString()}%`,
          }}
        />
        <View
          style={{
            ...styles.toFinish,
            width: '85%',
          }}
        />
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
