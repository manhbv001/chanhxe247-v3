export interface IResponse<T> {
  success: boolean;
  data: T;
  metadata?: Record<string, any>;
}

export class Response<T> implements IResponse<T> {
  success: boolean;
  data: T;
  metadata?: Record<string, any>;

  constructor(payload: Partial<IResponse<T>>) {
    this.data = payload.data;
    this.success = payload.success;
    this.metadata = payload.metadata;
  }
}

export class SuccessResponse<T> extends Response<T> {
  constructor(data: T, metadata?: Record<string, any>) {
    super({ success: true, data, metadata });
  }
}
