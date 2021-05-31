import React from 'react';
import PropTypes from 'prop-types';
import {Image} from 'react-native';
import Cog from '../../assets/icons/cogs.png';
import Search from '../../assets/icons/search.png';
import Books from '../../assets/icons/books.png';
import styles from './styles.js';
import colors from '../../constants/colors.js';

export default function Icon(props) {
  const {name, size, color, style} = props;

  let source = null;

  switch (name) {
    case 'cog':
      source = Cog;
      break;
    case 'books':
      source = Books;
      break;
    case 'search':
      source = Search;
      break;
    default:
      break;
  }

  if (!source) {
    return null;
  }

  return (
    <Image
      source={source}
      style={[
        styles.default,
        {
          width: size,
          height: size,
          tintColor: color,
        },
        style,
      ]}
    />
  );
}

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.number,
  color: PropTypes.string,
  style: PropTypes.any,
};

Icon.defaultProps = {
  size: 20,
  color: colors.darkGray,
  style: {},
};
