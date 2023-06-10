import mongoose from 'mongoose'
import app from './app'
import config from './config'
import { infoLogger, errorLogger } from '../src/shared/logger'
import { Server } from 'http'

// uncaught exception error handling
process.on('uncaughtException', (err) => {
  errorLogger.error(err)
  process.exit(1)
})

let server: Server

async function startMyBoy() {
  try {
    await mongoose.connect(config.database_url as string)
    server = app.listen(config.port, () => {
      infoLogger.info(`Application listening on port ${config.port}`)
    })
    infoLogger.info('Database is connected successfully')
  } catch (error) {
    errorLogger.error('Database connection failed', error)
  }

  // unhandled rejection error handling
  process.on('unhandledRejection', err => {
    console.log('unhandled rejection detected so closing our server...')
    if (server) {
      server.close(() => {
        errorLogger.error(err)
        process.exit(1)
      })
    } else {
      process.exit(1)
    }
  })
}

// call that function
startMyBoy()

// sigterm error handling
process.on('SIGTERM', () => {
  if (server) {
    infoLogger.info('SIGTERM is received')
    server.close()
  }
})
