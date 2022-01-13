const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
// default route
app.get('/', function (req,
                       res)
{
    return res.send({ error: true, message: 'hello' })
});

const dbConn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'smsQ'
});
// connect to database
dbConn.connect();

app.get('/read_all_messages', function (req,
                               res) {
    dbConn.query('SELECT * FROM sms_table',
        function (error, results, fields) {
        //if (error) throw error;
        return res.send(
            { error: false,
                data: results,
                message: 'users list.'
            });
    });
});

// set port
app.listen(3000, function () {
    console.log('Node app is running on port 3000');
});

module.exports = app;