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
        <Text style={styles.title}>Test Summary: </Text>
        <Text style={styles.scoreInfo}>{scoreInfo.message}</Text>
        <View style={styles.infoContainer}>
          <Text style={styles.text}>
            <Text style={styles.subtext}>Test status:</Text>
            {'             '}
            Finished
          </Text>
          <Text style={styles.text}>
            <Text style={styles.subtext}>Correct answers:</Text>
            {'    '}
            {scoreInfo.numberOfCorrectQuestions}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.subtext}>Total questions:</Text>
            {'      '}
            {scoreInfo.totalQuestions}
          </Text>
          <Text style={{...styles.text, borderBottomWidth: 0}}>
            <Text style={styles.subtext}>Score:</Text>
            {'                       '}
            {scoreInfo.score}%
          </Text>
        </View>
      </View>
      <TouchableOpacity style={styles.exitBtn} onPress={handleHomeNavigation}>
        <Text style={styles.exitBtnTxt}>Exit</Text>
      </TouchableOpacity>
    </Container>
  );
};

export default ScoreView;
