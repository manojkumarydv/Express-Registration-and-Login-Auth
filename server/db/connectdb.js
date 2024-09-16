import mongoose from "mongoose";

const connectDB = async (DATABASE_URL)=>{
    try {
        const DB_OPTIONS ={
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 30000,
            dbname :'blogdb',
        }
        await mongoose.connect(DATABASE_URL,DB_OPTIONS)
        console.log("Connect successfully....")

        
    } catch (error) {
        console.log(error);
        
    }
}
export default connectDB
