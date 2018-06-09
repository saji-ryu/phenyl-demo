// @flow

type Item<U> = {
  foo: number,
  bar: string
};

function identity<T: string>(value: T): T {
  //value += "world";
  return value;
}

let test: Item<number> = { foo: 11, bar: 33 };
identity("aaa");

type Item2<R> = {
  prop: R
};

class cl<S> {
  prop: S;
  constructor(param: S) {
    this.prop = param;
  }
}

function fc<F>(val: F): F {
  return val;
}
