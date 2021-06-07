import {View, TouchableOpacity, Text, Alert, Image} from 'react-native';
import React, {useEffect, useState, useContext} from 'react';
import Container from '../../components/container/container';
import styles from './styles';
import {StateContext, StatusContext} from '../../services/context';
import {StateCtx, StatusCtx} from '../../interfaces';
import * as SecureStore from 'expo-secure-store';
import TopicService from '../../services/topics';
import routes from '../../routes';
import Header from '../../components/header/header';
import Logo from '../../assets/icons/back-arrow.png';
const CheckIcon = require('../../assets/images/check.png');
type Props = {
  navigation: any;
  route: {params: {courseID: string; courseName: string}};
};

const TopicProgressView: React.FC<Props> = ({
  navigation,
  route,
}): JSX.Element => {
  const {courseID, courseName} = route.params;

  const [userCompletedTopics, setUserCompletedTopics] = useState<any[]>([]);

  const {updateUser, updateCurrentTopic} = useContext<StateCtx>(StateContext);
  const {showProgressDialog, hideProgressDialog} =
    useContext<StatusCtx>(StatusContext);

  const getAllMyActiveCourses = async () => {
    showProgressDialog();
    const {serverRes, error} = await TopicService.getCompletedTopics(courseID);
    hideProgressDialog();
    if (!error) {
      setUserCompletedTopics(serverRes.data);
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

  const handleSeeTestResults = (topicUser: any) => {
    navigation.navigate(routes.testresults);
    updateCurrentTopic(topicUser);
  };

  useEffect(() => {
    getAllMyActiveCourses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Container verticalHeight={0}>
      <Header logoSrc={Logo} onPressBack={navigation.goBack} />
      <View style={styles.coursesContainer}>
        <Text style={styles.title}>{courseName}</Text>
        {userCompletedTopics.length > 0 ? (
          userCompletedTopics.map((topic, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => handleSeeTestResults(topic)}
                style={styles.topicContainer}>
                <View style={styles.imageTitleContainer}>
                  <Image source={CheckIcon} style={styles.checkIconImage} />
                  <View>
                    <Text style={styles.topicName}>{topic.name}</Text>
                    <Text style={styles.topicDescription}>
                      {topic.description}
                    </Text>
                    <Text style={styles.topicTestResults}>Test results</Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })
        ) : (
          <Text style={styles.noContent}>
            You have not completed any topics yet!
          </Text>
        )}
      </View>
    </Container>
  );
};

export default TopicProgressView;
