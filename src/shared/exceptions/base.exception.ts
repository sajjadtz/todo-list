export class BaseException {
  constructor(
    readonly code: number,
    readonly message: string,
    readonly err?: Error,
  ) {}
}
