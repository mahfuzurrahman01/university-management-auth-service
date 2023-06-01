import mongoose from 'mongoose'
import app from './app'
import config from './config'

async function startMyBoy() {
  try {
    await mongoose.connect(config.database_url as string)
    app.listen(config.port, () => {
      console.log(`Application listening on port ${config.port}`)
    })
    console.log('Database is connected successfully')
  } catch (error) {
    console.log('Database connection failed', error)
  }
}

// call that function
startMyBoy()
