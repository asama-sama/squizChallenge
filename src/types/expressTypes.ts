export interface TypedRequestQuery<T> extends Express.Request {
  query: T
}

export interface TypedRequesetParams<T> extends Express.Request {
  params: T
}