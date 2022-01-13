const express = require("express");
const url = require("url");
const mysql = require('mysql');
const srv = express();

const mysqlcon = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'smsQ'
    });

let q;

mysqlcon.connect( function(err){
    if (err) throw err;
    console.log("Connected!");
});

srv.get("/sendSMS",
    function (
        req,
        res) {
    q = url.parse(req.url,
        true).query;
    console.log(q.phone, q.message);

        let sql = "INSERT INTO smsQ.sms_table (phone,body) VALUES(" + q.phone + ", \""+ q.message + "\");";
        // sql = sql + q.phone + ", " + q.message + ")";
    mysqlcon.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
        res.end("1");
    });
});

srv.listen(3000, function () {
    console.log("Server is listening on port 3000.");
}
);