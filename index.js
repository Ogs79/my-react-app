require('dotenv').config();

const express = require('express');
const sequelize = require('./db');
const models = require('./models/models');
const cors = require('cors')
const fileUpload = require('express-fileupload')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const path = require('path')

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors())
app.use(express.json())
app.use(fileUpload({}))
app.use('/api', router)

//Обработка ошибок, последний Middleware
app.use(errorHandler)

//const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
//console.log("Connection string:", connectionString);

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, () => console.log('Server started on port', PORT));
    } catch (e) {
        console.log(e);
    }
}

start();
