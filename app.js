const express = require('express')
const mongoose = require('mongoose')
const userRouter = require('./routes/userRoutes')
const itemRouter = require('./routes/itemRoutes')
const orderRouter = require('./routes/orderRoutes')

const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000
app.use(express.json())
app.use(cors());
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const db = process.env.DATABASE_ATLAS.replace('<DB_PASSWORD>', process.env.DB_PASSWORD)
app.listen(port, () => {
    console.log("Got connected to port " + port);
})

mongoose
    .connect(db, {
        useNewUrlParser: true
    })
    .then((con) => {
        console.log("Connection established successfully!!!");
    })
    .catch((err) => {
        console.log("Oops! Some error occured");
    });

app.use('/api/v1/users', userRouter)
app.use('/api/v1/items', itemRouter)
app.use('/api/v1/orders', orderRouter)