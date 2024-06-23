import mongoose from "mongoose";

const connectMongo = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/codial");
  } catch (error) {
    console.log(`error connecting to Mongoose: ${error}`);
  }
};
connectMongo();

const db = mongoose.connection;

db.on("error", console.error.bind(console, "error connecting to MongoDB"));

db.once("open", (err) => {
  if (err) {
    console.log(`error connecting to MongoDB: ${err}`);
  } else {
    console.log(`success connecting to MongoDB`);
  }
});

export default db;
