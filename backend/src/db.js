import mongoose from "mongoose";

const connectToMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("Successfully connected to MongoDB Atlas!");

    mongoose.connection.on('error', err => {
        console.error('MongoDB connection error after initial connection:', err);
    });

  } catch (error) {
    console.error("Fatal error connecting to MongoDB:", error.message);
    process.exit(1);
  }
};

export default connectToMongo;
