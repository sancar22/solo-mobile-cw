import {View, Text} from 'react-native';
import {StatusContext} from '../../services/context';
import React, {useContext, useEffect} from 'react';
import {StatCtx} from '../../interfaces/index';

const InitialView = (): JSX.Element => {
  const {showProgressDialog, hideProgressDialog} =
    useContext<StatCtx>(StatusContext);

  return (
    <View>
      <Text>Initial View</Text>
    </View>
  );
};

export default InitialView;
