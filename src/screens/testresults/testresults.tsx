import {View, Text} from 'react-native';
import React, {useContext} from 'react';
import Container from '../../components/container/container';
import styles from './styles';
import routes from '../../routes';
import Header from '../../components/header/header';
import Logo from '../../assets/icons/back-arrow.png';
import {StateCtx} from '../../interfaces';
import {StateContext} from '../../services/context';
type Props = {
  navigation: any;
};

const TestResultsView: React.FC<Props> = ({navigation, route}): JSX.Element => {
  const {currentTopicResult} = useContext<StateCtx>(StateContext);

  return (
    <Container verticalHeight={0}>
      <Header logoSrc={Logo} onPressBack={navigation.goBack} />
      <View style={styles.coursesContainer}>
        <Text style={styles.title}>
          Test Results - {currentTopicResult.name}
        </Text>
      </View>
    </Container>
  );
};

export default TestResultsView;
