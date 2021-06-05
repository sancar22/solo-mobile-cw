import {View, TouchableOpacity, Text} from 'react-native';
import React from 'react';

import Container from '../../components/container/container';
import styles from './styles';
import routes from '../../routes';
import Logo from '../../assets/icons/back-arrow.png';
import Header from '../../components/header/header';

type Props = {
  navigation: any;
  route: {params: {scoreInfo: any}};
};

const ScoreView: React.FC<Props> = ({navigation, route}): JSX.Element => {
  const {scoreInfo} = route.params;

  console.log(scoreInfo);

  const handleHomeNavigation = () => {
    navigation.reset({
      index: 0,
      routes: [{name: routes.home}],
    });
  };

  return (
    <Container verticalHeight={0}>
      <Header backArrow={false} logoSrc={Logo} />
      <View style={styles.scoreContainer}>
        <Text>{scoreInfo.message}</Text>
        <Text>
          You answered {scoreInfo.numberOfCorrectQuestions} out of{' '}
          {scoreInfo.totalQuestions} questions correctly giving you a score of{' '}
          {scoreInfo.score}%.
        </Text>
      </View>
      <TouchableOpacity style={styles.exitBtn} onPress={handleHomeNavigation}>
        <Text style={styles.exitBtnTxt}>Exit</Text>
      </TouchableOpacity>
    </Container>
  );
};

export default ScoreView;
