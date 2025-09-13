import mongoose from "mongoose";

// Connect to MongoDB
const connectToMongo = () => {
  // prettier-ignore
  mongoose.connect(process.env.MONGODB_URI).then(() => {
        console.log('Connected to MongoDB Atlas');
    }).catch((error) => {
        console.error('Error connecting to MongoDB Atlas:', error.message);
    });

  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "MongoDB connection error:"));
  db.once("open", () => console.log("Connected to MongoDB"));
};

export default connectToMongo;
