import {createContext} from 'react';
import {VISIBLE, HIDDEN} from '../constants/index';

const initialStatus = {
  visible: false,
  label: '',
};

const StatusContext = createContext({
  showProgressDialog: (label = '') => {},
  hideProgressDialog: () => {},
  ...initialStatus,
});

const statusReducer = (prevState, action) => {
  switch (action.type) {
    case VISIBLE:
      return {
        ...prevState,
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

export {StatusContext, statusReducer, initialStatus};
