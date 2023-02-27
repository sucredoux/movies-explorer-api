require('dotenv').config();

const {
  PORT_ENV, MONGO_URL, JWT_SECRET_KEY, NODE_ENV,
} = process.env;

const PORT = NODE_ENV === 'production' ? PORT_ENV : 3000;
const JWT_KEY = NODE_ENV === 'production' ? JWT_SECRET_KEY : 'dev_secret';
const MONGO_DB = NODE_ENV === 'production' ? MONGO_URL : 'mongodb://127.0.0.1:27017/bitfilmsdb';

module.exports = { PORT, JWT_KEY, MONGO_DB };
