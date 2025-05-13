// db.js (converted to ES module)
import mongoose from 'mongoose';

const connectDB = async () => {
  let attempts = 0;
  const maxRetries = 5;
  const retryDelay = 5000;

  const mongoURI = process.env.MONGO_URI;

  if (!mongoURI) {
    console.error('❌ MONGO_URI is missing in environment variables.');
    process.exit(1);
  }

  const connectWithRetry = async () => {
    try {
      await mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('✅ MongoDB connected successfully');
    } catch (err) {
      if (attempts < maxRetries) {
        attempts++;
        console.error(`❌ MongoDB connection error: ${err.message}. Retrying in ${retryDelay / 1000} seconds...`);
        await new Promise(resolve => setTimeout(resolve, retryDelay));
        await connectWithRetry();
      } else {
        console.error('❌ Max retries reached. MongoDB connection failed.');
        process.exit(1);
      }
    }
  };

  await connectWithRetry();
};

export default connectDB;
