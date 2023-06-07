import mongoose from 'mongoose'
import app from './app'
import config from './config'
import { infoLogger, errorLogger } from '../src/shared/logger'

async function startMyBoy() {
  try {
    await mongoose.connect(config.database_url as string)
    app.listen(config.port, () => {
      infoLogger.info(`Application listening on port ${config.port}`)
    })
    infoLogger.info('Database is connected successfully')
  } catch (error) {
    errorLogger.error('Database connection failed', error)
  }
}

// call that function
startMyBoy()
