import mongoose from "mongoose";

const connectDb = async (DB_URL) => {
    if (!DB_URL) {
        console.error("❌ Database URL is not defined");
        process.exit(1);
    }
    try {
        mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("✅ Database connected!");
    } catch (error) {
        console.error("❌ Database connection failed:", error.message);
        process.exit(1);
    }
};

export default connectDb;
