import express, { Application, NextFunction, Request, Response } from 'express'
import userRoute from './app/modules/users/user.routes'
const app: Application = express()
import cors from 'cors'

class ApiError extends Error {
  statusCode: number
  constructor(statusCode: number, message: string | undefined, stack = '') {
    super(message)
    this.statusCode = statusCode
    if (stack) {
      this.stack = stack
    }else {
      Error.captureStackTrace(this,this.constructor)
    }
  }
}

// using middleware
app.use(cors())
// parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api/v1/users/', userRoute)

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  throw new ApiError(400,'hello this is an error')
  // next('new error occurred') // error
})

// app.use((err,req: request,res: response,next: NextFunction) =>{
//   console.log(err)
//    if(err instanceof Error){
//     res.status(400).json({error: err})
//    }else {
//     res.status(500).json({error: 'something went wrong'})
//    }
// })

export default app
