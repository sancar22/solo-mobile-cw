import {ParamListBase, RouteProp} from '@react-navigation/native';

export interface StatusCtx {
  visible: boolean;
  label: string;
  showProgressDialog(label?: string): void;
  hideProgressDialog(): void;
}

export interface InitialStatus {
  visible: boolean;
  label: string;
}

export interface ActionStatus {
  type: string;
  label: string;
}

export interface StateCtx {
  updateUser(user: any): void;
  updateCurrentTopic(user: any): void;
  user: any;
  currentTopicResult: any;
}

export interface InitialState {
  user: Partial<User>;
  currentTopicResult: any;
}

export interface ActionState {
  type: string;
  user?: any;
  currentTopicResult?: any;
}
export interface CustomResponse<T> {
  serverRes: T;
  error: boolean;
}

export interface CustomAPIPromise<T> {
  (): Promise<CustomResponse<T>>;
}

export interface ReqOptions {
  [key: string]: () => Promise<{serverRes: any; error: boolean}>;
}

export interface Params {
  key: string;
  index: number;
  routeNames: string[];
  history?: unknown[] | undefined;
  routes: RouteProp<ParamListBase, string>[];
  type: string;
  stale: false;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  verified: boolean;
  stripeID: string;
  forgotPWToken: string;
}

export interface Topic {
  _id: string;
  enabled: Boolean;
  courseID: string;
  name: string;
  description: string;
  videoURL: string;
  questions: any[]; //TODO interface the objects in here
}
