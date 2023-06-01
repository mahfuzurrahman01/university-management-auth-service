import express, { Application, Request, Response } from 'express'
const app: Application = express()
import cors from 'cors'

// using middleware
app.use(cors())
// parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req: Request, res: Response) => {
  res.send('working successfully')
})

export default app
