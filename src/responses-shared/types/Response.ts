enum ResponseStatus {
  AwaitingModeration = 1,
  AwaitingPublication = 2,
  Published = 10,
  Rejected = 99
}

enum ResponseReplyType {
  auto = 0,
  manual = 1
}

enum ResponseApproveType {
  auto = 0,
  manual = 1
}

export { ResponseStatus, ResponseReplyType, ResponseApproveType };
