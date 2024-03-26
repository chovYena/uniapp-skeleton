// 返回res.data的interface
export interface IResponse<T = any> {
  code: number | string;
  data: T;
  message: string;
  success?: boolean;
  error?: string;
  status?: string | number;
}
