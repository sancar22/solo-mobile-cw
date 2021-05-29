import {createContext} from 'react';
import {VISIBLE, HIDDEN} from '../constants/index';
import {StatCtx, ActionCtx, InitialStatus} from '../interfaces/index';

const initialStatus: InitialStatus = {
  visible: false,
  label: '',
};

const StatusContext = createContext<StatCtx>({
  showProgressDialog: () => {},
  hideProgressDialog: () => {},
  ...initialStatus,
});

const statusReducer = (prevState: InitialStatus, action: ActionCtx) => {
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

export {StatusContext, statusReducer, initialStatus};
