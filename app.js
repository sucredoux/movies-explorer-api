const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { errors } = require('celebrate');
const routes = require('./routes');
const errorHandler = require('./middlewares/error-handler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
require('dotenv').config();

const { PORT, MONGO_URL } = process.env;

const app = express();
app.use(cookieParser());
app.use(bodyParser.json());

mongoose.set('strictQuery', true);
app.use(cors());
app.use(express.json());

app.use(requestLogger);

app.use(routes);

app.use(errorLogger);
routes.use(errors());
app.use(errorHandler);

async function connect() {
  await mongoose.connect(MONGO_URL);
  console.log('Server connect db');
  await app.listen(PORT);
  console.log('App listening on port ${PORT}');
}

connect();
