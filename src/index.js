import dotenv from "dotenv";

import connectDB from "./db/index.js";

dotenv.config({
    path: "./.env"
});

connectDB();

/*
const app = express();

(async () => {
    try{
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log("Connected to MongoDB");
        app.on("error", (error) => {
            console.log("ERROR: ",error);
            throw error;
        });
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });

    } catch (error) {
        console.log("ERROR: ",error);
        throw error;
    }

})();
*/