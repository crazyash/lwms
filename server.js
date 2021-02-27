const express = require('express'); // Express App
const dotenv = require('dotenv'); // Maintaining configuration files
const morgan = require('morgan'); // log requests
const bodyparser = require('body-parser');
const path = require('path');

const connectDB = require('./server/database/connection');
 
const app = express();

dotenv.config({ path: 'config.env' })
const PORT = process.env.PORT || 3000

// log requests
app.use(morgan('tiny'));

//mongodb connection
connectDB();

// parse request to body parser
app.use(bodyparser.urlencoded({ extended: true }))

// set view engine
app.set("view engine","ejs") // Other options: html, pug
//app.set("views", path.resolve(__dirname,"views/ejs"))

// load assets
app.use('/css',express.static(path.resolve(__dirname,"assets/css")))
app.use('/img',express.static(path.resolve(__dirname,"assets/img")))
app.use('/js',express.static(path.resolve(__dirname,"assets/js")))

// load router
app.use('/', require('./server/routes/router'))

// app.get('/', (req, res) => {
//     //res.send("LWMS Application");
//     res.render("index");

// })

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});