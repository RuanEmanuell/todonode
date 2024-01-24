import mongoose from 'mongoose';

const uri = 'your-mongo-key-here';

const databaseConnection = async () =>{
    if(!global.mongoose){
        mongoose.set('strictQuery', false);
        global.mongoose = await mongoose.connect(uri);
    }
}

export default databaseConnection;