export interface StatCtx {
  visible: boolean;
  label: string;
  showProgressDialog(label?: string): void;
  hideProgressDialog(): void;
}

export interface InitialStatus {
  visible: boolean;
  label: string;
}

export interface ActionCtx {
  type: string;
  label: string;
}
