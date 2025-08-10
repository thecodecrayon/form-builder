import mongoose from 'mongoose';

function connectDB(connObj) {
  return mongoose.connect(`${connObj.DB_CONN_STRING}/${connObj.DB_NAME}`);
}

export {
  connectDB
}