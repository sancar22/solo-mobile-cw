import {Text, View} from 'react-native';
import React, {useContext} from 'react';
import Container from '../../components/container/container';
import {StateContext, StatusContext} from '../../services/context';
import {StateCtx} from '../../interfaces';

const HomeView = (): JSX.Element => {
  const {user} = useContext<StateCtx>(StateContext);
  return (
    <Container verticalHeight={0}>
      <View>
        <Text>{user.name}</Text>
      </View>
    </Container>
  );
};

export default HomeView;
