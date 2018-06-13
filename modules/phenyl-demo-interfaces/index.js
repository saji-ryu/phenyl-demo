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

export type GetState = () => Object;
export type Dispatch = <A>(action: A | Function) => A | Promise<void>;

export type ThunkAction = (
  dispatch: Dispatch,
  getState: GetState
) => Promise<void>;
