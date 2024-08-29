
import mongoose from "mongoose";
import server from "./app";

const mongoUrl = "mongodb://localhost:27017/test";

if (!mongoUrl) {
  console.error("MONGO_URL is not defined in .env file");
  process.exit(1);
}

mongoose
  .connect(mongoUrl, {
  })
  .then(() => {
    console.log("MongoDB connection succeed");
    const PORT = process.env.PORT ?? 3003;
    server.listen(PORT, () => {
      console.log(`The server is running successfully on PORT: ${PORT}`);
      console.info(`Admin project on http://localhost:${PORT}/admin \n`);
    });
  })
  .catch((err) => {
    console.error("ERROR on connection MongoDb", err);
  });


