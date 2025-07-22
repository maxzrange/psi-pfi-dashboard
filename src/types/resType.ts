export type ResType<T = any> = {
  status: number;
  message: string;
  data: T;
};
