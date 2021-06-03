import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import Logo from '../../assets/icons/back-arrow.png';

import styles from './styles';

export type Props = {
  backArrow?: boolean;
  onPressBack?: () => void;
  logoSrc: string;
};

const Header: React.FC<Props> = ({
  backArrow = true,
  onPressBack = () => {},
  logoSrc = Logo,
}): JSX.Element => {
  return (
    <View style={backArrow ? styles.headerContainer : styles.noBack}>
      {backArrow && (
        <TouchableOpacity onPress={onPressBack}>
          <Image source={logoSrc} />
        </TouchableOpacity>
      )}
      <Image source={logoSrc} />
    </View>
  );
};

export default Header;
