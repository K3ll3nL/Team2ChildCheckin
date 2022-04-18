const mysql = require('mysql');

// mysql connection
var pool = mysql.createPool({
  host: 'sampledockercompose.c5kfaihzo8iz.us-east-2.rds.amazonaws.com',
  user: 'admin',
  password: 'Xmhl3kpOptsdJNj74zcg',
  port: 3306,
  database: 'childcheckin'
});

module.exports = pool;
