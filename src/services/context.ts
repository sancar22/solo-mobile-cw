import {createContext} from 'react';
import {VISIBLE, HIDDEN, USER, TEST_RESULTS} from '../constants/index';
import {
  StatusCtx,
  ActionStatus,
  InitialStatus,
  StateCtx,
  ActionState,
  InitialState,
} from '../interfaces/index';

// Status Context for progressDialog

const initialStatus: InitialStatus = {
  visible: false,
  label: '',
};

const StatusContext = createContext<StatusCtx>({
  showProgressDialog: () => {},
  hideProgressDialog: () => {},
  ...initialStatus,
});

const statusReducer = (
  prevState: InitialStatus,
  action: ActionStatus,
): InitialStatus => {
  switch (action.type) {
    case VISIBLE:
      return {
        visible: true,
        label: action.label,
      };
    case HIDDEN:
      return {
        label: '',
        visible: false,
      };
    default:
      return prevState;
  }
};

// State Context for application

const initialState: InitialState = {
  user: {},
  currentTopicResult: {},
};

const StateContext = createContext<StateCtx>({
  updateUser: () => {},
  updateCurrentTopic: () => {},
  ...initialState,
});

const stateReducer = (
  prevState: InitialState,
  action: ActionState,
): InitialState => {
  switch (action.type) {
    case USER:
      return {
        ...prevState,
        user: action.user,
      };
    case TEST_RESULTS:
      return {
        ...prevState,
        currentTopicResult: action.currentTopicResult,
      };
    default:
      return prevState;
  }
};

export {
  StatusContext,
  statusReducer,
  initialStatus,
  StateContext,
  stateReducer,
  initialState,
};
