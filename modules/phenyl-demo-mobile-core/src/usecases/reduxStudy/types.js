//@flow
//場合によって適宜堅く
export type MemoData = {
  id: number,
  createdAt: number,
  updatedAt: number,
  title: MemoTitle,
  content: MemoContent,
};
export type MemoData_Create = {
  id: number,
  title: MemoTitle,
  content: MemoContent,
};
export type MemoData_Update = {
  id: number,
  title: MemoTitle,
  content: MemoContent,
};
export type MemoData_Delete = {
  id: number,
};
export type MemoTitle = string;

export type MemoContent = string;

export type MemoId = string;

export type UserData = {
  userId: string,
  name: string,
  password: string,
};

export type ReduxAction = {
  type: string,
  payload: {
    memo: {
      id: number,
      [key: string]: any,
    },
  },
};
