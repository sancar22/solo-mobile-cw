import React, {ReactNode} from 'react';
import {View, SafeAreaView} from 'react-native';
import {KeyboardAwareScrollView} from '@codler/react-native-keyboard-aware-scroll-view';
import styles from './styles';
import Br from '../../components/br';

export type Props = {
  children: ReactNode;
  noScroll?: boolean;
  backgroundColor?: string;
  verticalHeight?: number;
};

const Container: React.FC<Props> = ({
  children,
  noScroll = false,
  backgroundColor = '#FFFFFF',
  verticalHeight = 40,
}): JSX.Element => {
  return (
    <SafeAreaView style={{...styles.mainView, backgroundColor}}>
      <View style={styles.view}>
        {noScroll ? (
          <View style={styles.view}>{children}</View>
        ) : (
          <KeyboardAwareScrollView
            style={styles.keyboardAwareScrollView}
            keyboardShouldPersistTaps="handled">
            <View style={styles.view}>
              {children}
              <Br height={verticalHeight} />
            </View>
          </KeyboardAwareScrollView>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Container;
