import * as React from 'react';
import {ImageProps} from 'react-native';

declare class Icon extends React.Component<IconProps, any> {}

interface IconProps extends ImageProps {
  name: 'cog' | 'books' | 'search';
  /**
   * The default value is 20.
   */
  size?: number;
  /**
   * The default color is black.
   */
  color?: string;
}

declare var IconType: typeof Icon;
export = IconType;
