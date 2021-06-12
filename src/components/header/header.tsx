import React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
const Logo = require('../../assets/images/DEVcademy.png');
const back = require('../../assets/icons/back-arrow.png');

import styles from './styles';

export type Props = {
  backArrow?: boolean;
  onPressBack?: () => void;
  logoSrc?: string;
  defaultMarginBottom?: number;
};

const Header: React.FC<Props> = ({
  backArrow = true,
  onPressBack = () => {},
  logoSrc = Logo,
  defaultMarginBottom = 30,
}): JSX.Element => {
  return (
    <View
      style={{
        ...(backArrow ? styles.headerContainer : styles.noBack),
        marginBottom: defaultMarginBottom,
      }}>
      {backArrow && (
        <TouchableOpacity onPress={onPressBack}>
          <Image style={{width: 40, height: 30}} source={back} />
        </TouchableOpacity>
      )}
      <Image style={{width: 180}} source={logoSrc} />
    </View>
  );
};

export default Header;
