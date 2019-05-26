var express = require('express');
var app = express();
const morgan=require('morgan');
const bodyParser=require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const products=require('./routers/products');
const config=require('./config');
mongoose.connect('mongodb+srv://hohshen:' +
    config.password+
    '@cluster-ddd9v.mongodb.net/test?retryWrites=true',
    { useNewUrlParser: true }
);
mongoose.Promise=global.Promise;
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(cors());
app.options('/', cors());
app.use('/products', products);
app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
