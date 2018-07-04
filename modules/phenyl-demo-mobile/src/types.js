// @flow
// 場合によって適宜堅く

export type Memo = {
  id: number,
  createdAt: number,
  updatedAt: number,
  title: string,
  content: string,
};

export type User = {
  id: string,
  email: string,
  password: string,
};
