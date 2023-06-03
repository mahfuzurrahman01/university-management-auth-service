import express, { Application, Request, Response } from 'express'
import userRoute from './app/modules/users/user.routes'
const app: Application = express()
import cors from 'cors'

// using middleware
app.use(cors())
// parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api/v1/users/', userRoute)
app.get('/', async (req: Request, res: Response) => {
  res.send('working successfully')
})

export default app
