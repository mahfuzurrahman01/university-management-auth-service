import { RequestHandler } from 'express'
import { userService } from './user.services'

const createUserToDb: RequestHandler = async (req, res, next) => {
  const { user } = req.body

  try {
    // ============== zod error checking ===============

    const result = await userService.createUser(user)
    res.status(200).json({
      success: true,
      message: 'user created successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

export const userController = {
  createUserToDb,
}
