import {View, TouchableOpacity, Text} from 'react-native';
import React from 'react';

import Container from '../../components/container/container';
import styles from './styles';
import routes from '../../routes';
import Header from '../../components/header/header';
import RNVideo from './RNVideo';

type Props = {
  navigation: any;
  route: {params: {topicID: string; videoURL: string; completed: boolean}};
};

const VideoView: React.FC<Props> = ({navigation, route}): JSX.Element => {
  const {topicID, videoURL, completed} = route.params;

  const handleNavigationQuestions = () => {
    navigation.navigate(routes.questions, {topicID});
  };

  return (
    <Container verticalHeight={0}>
      <Header onPressBack={navigation.goBack} defaultMarginBottom={0} />
      <View style={styles.body}>
        <TouchableOpacity>
          <RNVideo uri={videoURL} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={{...styles.testBtn, display: completed ? 'none' : 'flex'}}
        onPress={handleNavigationQuestions}>
        <Text style={styles.testBtnTxt}>Test</Text>
      </TouchableOpacity>
    </Container>
  );
};

export default VideoView;
