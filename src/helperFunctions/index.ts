import {Alert} from 'react-native';

const alertWithOptions = (
  title: string,
  subtitle: string,
  opt1Text: string,
  opt1Handler: () => void,
  opt2Text: string,
  opt2Handler: () => void,
): void => {
  Alert.alert(
    title,
    subtitle,
    [
      {
        text: opt1Text,
        onPress: opt1Handler,
        style: 'cancel',
      },
      {
        text: opt2Text,
        onPress: opt2Handler,
      },
    ],
    {cancelable: false},
  );
};

export {alertWithOptions};
