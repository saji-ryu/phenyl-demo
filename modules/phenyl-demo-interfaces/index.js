// @flow

// FIXME: ちゃんと書く
//mbaas/defiinition/indexで利用
export type EntityMap = {
  medicalStaff: {
    id: string,
    name: string,
  },
  patient: any,
  prescriptionCode: any,
  medicalInstitution: any,
  medicalRecord: any,
  lesson: any,
  weightRecord: any,
  resetPasswordTicket: any,
};

//TODO: もう少し型を堅くする
export type Action = Object;

export type GetState = () => Object;
export type Dispatch = (action: Action | ThunkAction) => Promise<void> | void;

export type ThunkAction = (
  dispatch: Dispatch,
  getState: GetState
) => Promise<void> | void;
