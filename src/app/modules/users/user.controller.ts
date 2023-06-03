import { Request, Response } from 'express'
import userServices from './user.services'
const createUserToDb = async (req: Request, res: Response) => {
  const { user } = req.body
  try {
    const result = await userServices.createUser(user)
    res.status(200).json({
      success: true,
      message: 'user created successfully',
      data: result,
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'failed to create user',
    })
  }
}

export default {
  createUserToDb,
}
