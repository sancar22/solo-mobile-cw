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
import {alertWithOptions} from '../../helperFunctions/index';
import RadioForm from 'react-native-simple-radio-button';

type Props = {
  navigation: any;
  route: {params: {topicID: string}};
};

const QuestionsView: React.FC<Props> = ({navigation, route}): JSX.Element => {
  const {topicID} = route.params;

  const [topic, setTopic] = useState<any>({});
  const [questions, setQuestions] = useState<any[]>([]);
  const {updateUser} = useContext<StateCtx>(StateContext);
  const {showProgressDialog, hideProgressDialog} =
    useContext<StatusCtx>(StatusContext);

  const getCurrentTopic = async () => {
    showProgressDialog();
    const {serverRes, error} = await TopicsService.getTopic(topicID);
    hideProgressDialog();
    if (!error) {
      setTopic(serverRes.data);
      setQuestions(serverRes.data.questions);
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

  const handleChoiceSelection = (choiceIdx: number, questionIdx: number) => {
    if (questions[questionIdx].choices[choiceIdx].correct) {
      setQuestions(prevQuestions => {
        const copyQuestion = [...prevQuestions];
        copyQuestion[questionIdx].userRespondedCorrectly = true;
        copyQuestion[questionIdx].userAnswer = choiceIdx;
        return copyQuestion;
      });
    } else {
      setQuestions(prevQuestions => {
        const copyQuestion = [...prevQuestions];
        copyQuestion[questionIdx].userRespondedCorrectly = false;
        copyQuestion[questionIdx].userAnswer = choiceIdx;
        return copyQuestion;
      });
    }
  };

  const handleEndTest = async () => {
    showProgressDialog();
    const {serverRes, error} = await TopicsService.submitTest(
      questions,
      topic.courseID,
      topic._id,
    );
    hideProgressDialog();
    if (!error) {
      navigation.reset({
        index: 0,
        routes: [{name: routes.score, params: {scoreInfo: serverRes.data}}],
      });
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

  const handleSubmitTest = () => {
    alertWithOptions(
      'There are no retakes!',
      'Are you sure you want to submit the test?',
      'No',
      () => {},
      'Yes',
      () => handleEndTest(),
    );
  };

  useEffect(() => {
    getCurrentTopic();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container verticalHeight={0}>
      <Header
        onPressBack={navigation.goBack}
        logoSrc={Logo}
        defaultMarginBottom={0}
      />
      <View style={styles.testContainer}>
        <Text style={styles.title}>{topic.name} - Test </Text>
        {questions.map((question, questionIdx) => {
          const radio_props = question.choices.map(
            (choice: {name: string; correct: boolean}, index: number) => ({
              label: choice.name,
              value: index,
            }),
          );
          return (
            <View key={questionIdx} style={styles.questionChoicesContainer}>
              <Text style={styles.wholeQuestion}>
                <Text style={styles.questionNumber}>
                  Question #{questionIdx + 1}:
                </Text>
                {question.question}
              </Text>
              <RadioForm
                radio_props={radio_props}
                initial={0}
                onPress={(value: number) => {
                  handleChoiceSelection(value, questionIdx);
                }}
              />
            </View>
          );
        })}
        <TouchableOpacity style={styles.testBtn} onPress={handleSubmitTest}>
          <Text style={styles.testBtnTxt}>Submit</Text>
        </TouchableOpacity>
      </View>
    </Container>
  );
};

export default QuestionsView;
