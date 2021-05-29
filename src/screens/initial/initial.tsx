import {View, Text} from 'react-native';
import {StatusContext} from '../../services/context';
import React, {useContext, useEffect} from 'react';

const InitialView = (): JSX.Element => {
  const {showProgressDialog, hideProgressDialog} = useContext(StatusContext);

  return (
    <View>
      <Text>Initial View</Text>
    </View>
  );
};

export default InitialView;
