//@flow
//場合によって適宜堅く
export type MemoData_Create = {
  title: MemoTitle,
  content: MemoContent,
};
export type MemoData_Update = {
  id: string,
  title: MemoTitle,
  content: MemoContent,
};
export type MemoData_Delete = {
  id: string,
  createdAt?: number,
  updatedAt?: number,
  title?: MemoTitle,
  content?: MemoContent,
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
      id: string,
      [key: string]: any,
    },
  },
};
