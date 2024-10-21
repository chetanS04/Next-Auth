import mongoose from "mongoose";

const connect = async () => {
  if (mongoose.connections[0].readyState) return;
    await mongoose.connect("mongodb://localhost:27017/mydata", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Mongo Connection successfully established.");
  }

export default connect;
