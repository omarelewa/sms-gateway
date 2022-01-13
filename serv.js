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
    mysqlcon.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
        res.end("1");
    });
});

srv.get("/getSMS",
    function (req,
              res) {
    mysqlcon.query("select * from sms_table where (ts=(select min(ts) from sms_table where sent = 0))",
        function (err, result, fields) {
        if(err) throw err;
        console.log(result);
        res.send(result);
    })
});

srv.get("/smsSent",
    function (req,
              res) {
        q = url.parse(req.url,
            true).query;
        console.log(q.id);

        let sql = "UPDATE sms_table SET sent = 1 WHERE id ="+q.id;
        mysqlcon.query(sql, function (err, result) {
            if (err) throw err;
            console.log("1 message sent");
            let m = q.id + ": sent"
            res.send(m);
        });
    });

srv.listen(3000, function () {
    console.log("Server is listening on port 3000.");
}
);