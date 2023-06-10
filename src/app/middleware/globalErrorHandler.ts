import { ErrorRequestHandler } from 'express'
import { IGenericInterface } from '../../interfaces/errorInterface'
import config from '../../config'
import handleValidationError from '../../errors/handleValidationError'
import ApiError from '../../errors/apiErrors'
// import { errorLogger } from '../../shared/logger'
import { ZodError } from 'zod'

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = 400
  let message = 'something went wrong'
  const success = false
  let errorMessages: IGenericInterface[] = []

  // eslint-disable-next-line no-unused-expressions
  // config.env === 'development'
  //   ? console.log('global error handler', err)
  //   : errorLogger.error('Global error handler', err)

  if (err instanceof ZodError) {
    console.log('Ei j tomar zod error', err.issues)
  }

  if (err.name === 'ValidationError') {
    const simplifiedError = handleValidationError(err)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorMessages = simplifiedError.errorMessage
  } else if (err instanceof ApiError) {
    statusCode = err.statusCode
    message = err?.message
    errorMessages = err?.message
      ? [
          {
            path: '',
            message: '',
          },
        ]
      : []
  } else if (err instanceof Error) {
    message = 'Something went wrong'
    errorMessages = err?.message
      ? [
          {
            path: '',
            message: '',
          },
        ]
      : []
  }

  res.status(statusCode).json({
    success,
    message,
    errorMessages,
    stack: config.env !== 'production' ? err?.stack : undefined,
  })
  //   res.status(400).json({
  //     bis: err,
  //   })
  next()
}

export default globalErrorHandler
