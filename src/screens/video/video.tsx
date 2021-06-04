import {View, TouchableOpacity, Text, Alert} from 'react-native';
import React, {useEffect, useState, useContext} from 'react';

import Container from '../../components/container/container';
import styles from './styles';
import routes from '../../routes';
import Logo from '../../assets/icons/back-arrow.png';
import Header from '../../components/header/header';
import TopicsService from '../../services/topics';
import {StateContext, StatusContext} from '../../services/context';
import {StateCtx, StatusCtx} from '../../interfaces';
import * as SecureStore from 'expo-secure-store';
import RNVideo from './RNVideo';

type Props = {
  navigation: any;
  route: {params: {id: string; videoURL: string}};
};

const VideoView: React.FC<Props> = ({navigation, route}): JSX.Element => {
  const {id, videoURL} = route.params;

  const [topics, setTopics] = useState([]);
  const {updateUser} = useContext<StateCtx>(StateContext);
  const {showProgressDialog, hideProgressDialog} =
    useContext<StatusCtx>(StatusContext);

  const handleNavigationQuestions = () => {};

  return (
    <Container verticalHeight={0}>
      <Header
        onPressBack={navigation.goBack}
        logoSrc={Logo}
        defaultMarginBottom={0}
      />
      <View style={styles.body}>
        <TouchableOpacity>
          <RNVideo uri={videoURL} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.testBtn}
        onPress={handleNavigationQuestions}>
        <Text style={styles.testBtnTxt}>Test</Text>
      </TouchableOpacity>
    </Container>
  );
};

export default VideoView;
