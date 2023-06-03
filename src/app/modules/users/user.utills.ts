import { User } from './user.model'

const getLastUserId = async () => {
  const lastUserId = await User.findOne({}, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean()
  return lastUserId?.id
}

const generateUserId = async () => {
  const userId = (await getLastUserId()) || (0).toString().padStart(5, '0')
  const createdUserId = (parseInt(userId) + 1).toString().padStart(5, '0')
  return createdUserId
}

export default generateUserId
