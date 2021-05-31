import {View, Image, TouchableOpacity, Text, Alert} from 'react-native';
import React from 'react';
import Container from '../../components/container/container';
import styles from './styles';
import colors from '../../constants/colors';

type Props = {
  navigation: any;
};

const CourseProgressView: React.FC<Props> = ({navigation}): JSX.Element => {
  return (
    <Container verticalHeight={0}>
      <View>
        <Text>Course Progress</Text>
      </View>
    </Container>
  );
};

export default CourseProgressView;
