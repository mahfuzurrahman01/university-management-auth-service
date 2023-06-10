import { NextFunction, Request, Response } from 'express'
import { AnyZodObject } from 'zod'

const validationRequest =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        params: req.params,
        query: req.query,
        cookies: req.cookies,
      })
      return next()
    } catch (err) {
      next(err)
    }
  }

export default validationRequest
