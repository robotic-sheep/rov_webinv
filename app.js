const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const app = express();

const {getHomePage, getInventoryPage, getPurchasePage, getCadPage, getAnalyticsPage} = require('./routes/index');
const {addItemPage, addItem, deleteItem, editItem, editItemPage} = require('./routes/item');
const port = 8080;

// create connection to database
// the mysql.createConnection function takes in a configuration object which contains host, user, password and the database name.
const db = mysql.createConnection ({
    host: 'localhost',
    user: 'vcs',
    password: 'password',
    database: 'inventory_mgmt'
});

// connect to database
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});
global.db = db;

// configure middleware
app.set('port', process.env.port || port); // set express to use this port
app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
app.set('view engine', 'ejs'); // configure template engine
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client
app.use(express.static(path.join(__dirname, 'public'))); // configure express to use public folder
app.use(fileUpload()); // configure fileupload

// routes for the app

app.get('/', getHomePage);
app.get('/inventory/', getInventoryPage);
app.get('/inventory/add', addItemPage);
app.get('/inventory/edit/:id', editItemPage);
app.get('/inventory/delete/:id', deleteItem);
app.post('/inventory/add', addItem);
app.post('/inventory/edit/:id', editItem);

app.get('/purchase/', getPurchasePage);
app.get('/cad/', getCadPage);
app.get('/analytics/', getAnalyticsPage);

// set the app to listen on the port
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});

