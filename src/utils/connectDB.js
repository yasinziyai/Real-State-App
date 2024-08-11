import mongoose from "mongoose";

async function connectDB() {
  if (mongoose.connections[0].readyState) return;
  mongoose.set("strictQuery", false);
  await mongoose.connect(
    "mongodb://yasinziyai81:16421642@ac-mqoznii-shard-00-00.idabqev.mongodb.net:27017,ac-mqoznii-shard-00-01.idabqev.mongodb.net:27017,ac-mqoznii-shard-00-02.idabqev.mongodb.net:27017/?ssl=true&replicaSet=atlas-xyzv0j-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0"
  );
  console.log("Connected to DB");
}

export default connectDB;
