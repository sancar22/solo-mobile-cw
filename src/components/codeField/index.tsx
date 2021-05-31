import React, {useState, useEffect} from 'react';
import {SafeAreaView, Text} from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import styles from './styles';

const CELL_COUNT = 6;

type Props = {
  title?: string;
  onChangeCode: (code: string) => void;
};

const CodeGrids: React.FC<Props> = ({onChangeCode, title}): JSX.Element => {
  const [value, setValue] = useState<string>('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  useEffect(() => {
    onChangeCode(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);
  return (
    <SafeAreaView style={styles.root}>
      <Text style={styles.title}>{title}</Text>
      <CodeField
        ref={ref}
        {...props}
        caretHidden={false}
        value={value}
        onChangeText={e => {
          setValue(e);
        }}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({index, symbol, isFocused}) => (
          <Text
            key={index}
            style={[styles.cell, isFocused && styles.focusCell]}
            onLayout={getCellOnLayoutHandler(index)}>
            {symbol || (isFocused ? <Cursor /> : null)}
          </Text>
        )}
      />
    </SafeAreaView>
  );
};

export default CodeGrids;
