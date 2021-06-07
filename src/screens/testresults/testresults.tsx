import {View, Text} from 'react-native';
import React, {useContext} from 'react';
import Container from '../../components/container/container';
import styles from './styles';
import Header from '../../components/header/header';
import Logo from '../../assets/icons/back-arrow.png';
import {StateCtx} from '../../interfaces';
import {StateContext} from '../../services/context';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../../constants/colors';
type Props = {
  navigation: any;
};

const TestResultsView: React.FC<Props> = ({navigation}): JSX.Element => {
  const {currentTopicResult} = useContext<StateCtx>(StateContext);

  const getColor = (response: any, choiceIdx: number) => {
    const choice = response.choices[choiceIdx];
    const userAnswer = response.userAnswer;
    const userCorrect = response.userRespondedCorrectly;
    if (userAnswer !== choiceIdx && !choice.correct) {
      return 'transparent';
    }
    if (choice.correct || userCorrect) {
      return colors.correctColor;
    }
    if (userAnswer === choiceIdx && !choice.correct) {
      return colors.wrongColor;
    }
  };

  return (
    <Container verticalHeight={0}>
      <Header logoSrc={Logo} onPressBack={navigation.goBack} />
      <View style={styles.testResultContainer}>
        <Text style={styles.title}>Test Review: {currentTopicResult.name}</Text>
        {currentTopicResult.responses.map((response: any, index: number) => {
          return (
            <View key={index} style={styles.questionContainer}>
              <View style={styles.iconContainer}>
                <Icon
                  name={
                    response.userRespondedCorrectly ? 'check' : 'times-circle'
                  }
                  size={25}
                  color={response.userRespondedCorrectly ? 'green' : 'red'}
                />
                <Text style={styles.question}>
                  <Text style={styles.questionNumber}>
                    Question {index + 1}:
                  </Text>
                  {response.question}
                </Text>
              </View>
              {response.choices.map((choice: any, choiceIdx: number) => {
                return (
                  <View
                    key={choiceIdx}
                    style={{
                      ...styles.choices,
                      backgroundColor: getColor(response, choiceIdx),
                    }}>
                    <Text>{choice.name}</Text>
                  </View>
                );
              })}
            </View>
          );
        })}
      </View>
    </Container>
  );
};

export default TestResultsView;
