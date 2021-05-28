import React, {Component} from 'react';
import {View} from 'react-native';
import styles from './styles';

interface BrProps {
  height?: number;
}

export default class Br extends Component<BrProps> {
  public static defaultProps = {
    height: 20,
  };
  public render(): JSX.Element {
    const {height} = this.props;
    return <View style={[styles.container, {height}]} />;
  }
}
