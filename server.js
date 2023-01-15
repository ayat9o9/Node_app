const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors=require('cors')
const xss=require('xss-clean')
const mongoSantize=require('express-mongo-sanitize')
const helmt=require('helmet')
const path=require('path')

dotenv.config({path: './.env'});

const app = express();


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors())
app.use(xss())
app.use(mongoSantize())
app.use(helmt())
app.use(express.static(path.join(__dirname,'public-flutter')))

//database
const db = process.env.DATABASE

mongoose.connect(db , {
    useCreateIndex: true,
    useNewUrlParser:true,
    useFindAndModify:false,
    useUnifiedTopology:true
}).then(()=>{
    console.log('connection done')
}).catch(err =>{
    console.log(err);
})


const orderRouter=require('./Router/Order')

app.use('/api/v1',orderRouter)

const PORT = process.env.PORT ||  3000;
app.listen(PORT, ()=>{
    console.log(`app is runing on port ${PORT}`);
})

