export interface IMethod {
  id: number;
  title: string;
  titleFa: string;
}

export type MethodsGet = {
  code: string;
  message: string;
  statusCode: number;
  data: IMethod[];
};
