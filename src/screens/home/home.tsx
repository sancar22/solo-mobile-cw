import {Text, View} from 'react-native';
import React from 'react';
import Container from '../../components/container/container';

const HomeView = (): JSX.Element => {
  return (
    <Container verticalHeight={0}>
      <View>
        <Text>Home View</Text>
      </View>
    </Container>
  );
};

export default HomeView;
