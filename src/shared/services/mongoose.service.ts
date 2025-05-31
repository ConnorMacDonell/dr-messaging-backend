import mongoose from "mongoose";
import debug from "debug";

const log: debug.IDebugger = debug('app:mongoose-service');

class MongooseService {
  private count = 0;
  private mongooseOptions = {
    serverSelectionTimeoutMS: 5000,
  };

  constructor() {
    this.connectWithRetry();
  }

  getMongoose() {
    return mongoose;
  }

  connectWithRetry = () => {
    log('Attempting MongoDB connection (will retry if needed');
    
    // Use environment variable for production, fallback to local for development
    const mongoUrl = process.env.MONGODB_URL || 'mongodb://localhost:27017/api-db';
    
    console.log('Connecting to MongoDB:', mongoUrl.replace(/\/\/[^:]+:[^@]+@/, '//***:***@')); // Log URL without credentials
    
    mongoose
      .connect(mongoUrl, this.mongooseOptions)
      .then(() => {
        console.log('MongoDB is connected...');
      })
      .catch((err) => {
        const retrySeconds = 5;
        console.log(
            `MongoDB connection unsuccessful (will retry #${++this
              .count} after ${retrySeconds} seconds):`,
            err
        );
        setTimeout(this.connectWithRetry, retrySeconds * 1000);
      });
  };
}

export default new MongooseService();