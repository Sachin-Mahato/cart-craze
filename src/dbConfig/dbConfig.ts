import mongoose from "mongoose";

type ConnectionObject = {
    isConnected?: number;
};

const connection: ConnectionObject = {};

export async function dbConfig(): Promise<void> {
    try {
        if (connection.isConnected) {
            console.log("Already connect to database");
            return;
        }
        const db = await mongoose.connect(process.env.MONGO_URI || "", {});
        connection.isConnected = db.connections[0].readyState;

        console.log(`db connected successfully: ${db}`);
    } catch (error) {
        console.log("Data connection failed", error);
        process.exit(1);
    }
}
