import React from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import Br from '../br/index';
import styles from './styles';

export type Props = {
  visible: boolean;
  label: string;
};

const ProgressDialog: React.FC<Props> = ({visible, label}): JSX.Element => {
  if (visible) {
    return (
      <View style={styles.background}>
        <View style={styles.container}>
          <Text style={styles.title}>Please wait...</Text>
          <Br />
          <View style={styles.row}>
            <ActivityIndicator size="large" color="#209688" />
            <Text style={styles.text}>{label || 'Loading'}...</Text>
          </View>
        </View>
      </View>
    );
  }
  return <></>;
};

export default ProgressDialog;
