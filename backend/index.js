const express = require('express')
const mongoose = require ('mongoose');
const app = express()
const cors = require('cors')
require('dotenv').config()
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')


const port = process.env.PORT || 5000;


// console.log(process.env)


// Middleware Setup
app.use(express.json({limit:"25mb"}))
app.use(express.urlencoded({ extended: true, limit: '25mb' }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.urlencoded({ limit: '25mb', extended: true }));



app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}))





// All Routes
const authRoutes = require('./src/users/user.route')
const productRoutes = require('./src/products/products.route')


app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)


main().then(() => console.log("MongoDB Is Connected")).catch(err => console.log(err));



async function main() {
    await mongoose.connect(process.env.DB_URL);
  
    app.get('/', (req, res) => {
      res.send('Hello World!')
    })
  }



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})