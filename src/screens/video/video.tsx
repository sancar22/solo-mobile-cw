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

type Props = {
  navigation: any;
  route: {params: {courseID: string}};
};

const VideoView: React.FC<Props> = ({navigation, route}): JSX.Element => {
  const {courseID} = route.params;

  const [topics, setTopics] = useState([]);
  const {updateUser} = useContext<StateCtx>(StateContext);
  const {showProgressDialog, hideProgressDialog} =
    useContext<StatusCtx>(StatusContext);

  const getAllTopicsForCourse = async () => {
    showProgressDialog();
    const {serverRes, error} = await TopicsService.getActiveTopics(courseID);
    hideProgressDialog();
    if (!error) {
      setTopics(serverRes.data);
    }
    if (serverRes?.status === 401) {
      await SecureStore.deleteItemAsync('session');
      updateUser({});
      navigation.reset({
        index: 0,
        routes: [{name: routes.initial}],
      });
    }
    if (error) {
      Alert.alert(serverRes?.data?.msg);
    }
  };

  const handleTopicNavigation = (id: string, videoURL: string) => {};

  useEffect(() => {
    getAllTopicsForCourse();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container verticalHeight={0}>
      <Header onPressBack={navigation.goBack} logoSrc={Logo} />
      {topics.length > 0 &&
        topics.map(topic => {
          const {name, description, completed, _id, videoURL} = topic;
          return (
            <View style={styles.topicContainer} key={_id}>
              <Text style={styles.topicName}>{name}</Text>
              <Text style={styles.topicDescription}>{description}</Text>
              <TouchableOpacity
                style={styles.topicBtn}
                onPress={() => handleTopicNavigation(_id, videoURL)}>
                <Text style={styles.topicBtnTxt}>
                  {completed ? 'Rewatch Video' : 'Start Topic'}
                </Text>
              </TouchableOpacity>
            </View>
          );
        })}
    </Container>
  );
};

export default VideoView;
