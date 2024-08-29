"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const mongoUrl = process.env.MONGO_URL;
if (!mongoUrl) {
    console.error("MONGO_URL is not defined in .env file");
    process.exit(1);
}
mongoose_1.default
    .connect(mongoUrl, {})
    .then(() => {
    console.log("MongoDB connection succeed");
    const PORT = process.env.PORT ?? 3003;
    app_1.default.listen(PORT, () => {
        console.log(`The server is running successfully on PORT: ${PORT}`);
        console.info(`Admin project on http://localhost:${PORT}/admin \n`);
    });
})
    .catch((err) => {
    console.error("ERROR on connection MongoDb", err);
});
