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
  user: any;
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
