"use strict";
// import mongoose from "mongoose";
// import server from "./app";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const mongoUrl = "mongodb://localhost:27017/test";
// if (!mongoUrl) {
//   console.error("MONGO_URL is not defined in .env file");
//   process.exit(1);
// }
// mongoose
//   .connect(mongoUrl, {
//   })
//   .then(() => {
//     console.log("MongoDB connection succeed");
//     const PORT = process.env.PORT ?? 3003;
//     server.listen(PORT, () => {
//       console.log(`The server is running successfully on PORT: ${PORT}`);
//       console.info(`Admin project on http://localhost:${PORT}/admin \n`);
//     });
//   })
//   .catch((err) => {
//     console.error("ERROR on connection MongoDb", err);
//   });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const mongoUrl = process.env.MONGO_URL; // To'g'ri muhit o'zgaruvchisini o'qish
if (!mongoUrl) {
    console.error("MONGO_URL is not defined in .env file");
    process.exit(1);
}
mongoose_1.default
    .connect(mongoUrl, {})
    .then(() => {
    console.log("MongoDB connection succeeded");
    const PORT = process.env.PORT ?? 3003;
    app_1.default.listen(PORT, () => {
        console.log(`The server is running successfully on PORT: ${PORT}`);
        console.info(`Admin project on http://localhost:${PORT}/admin \n`);
    });
})
    .catch((err) => {
    console.error("ERROR on connection MongoDB", err);
});
