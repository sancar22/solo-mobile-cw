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
}

export interface InitialState {
  user: any;
}

export interface ActionState {
  type: string;
  user?: any;
}
