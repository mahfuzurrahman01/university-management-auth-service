import { IGenericInterface } from './errorInterface'

export type IGenericResponseInterface = {
  statusCode: number
  message: string
  errorMessage: IGenericInterface[]
}
