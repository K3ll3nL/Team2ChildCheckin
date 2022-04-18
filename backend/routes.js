const pool = require('./db')

module.exports = function routes(app, logger) {
  // GET /
  // Shows all tables
  app.get('/', (req, res) => {
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection'); 
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        connection.query(`SHOW TABLES`, function (err, rows, fields) {
          connection.release();
          if (err) {
            // if there is an error withID the query, log the error
            logger.error("Problem getting from table: \n", err);
            res.status(400).send('Problem getting table'); 
          } else {
            console.log(rows)
            res.status(200).json({
              "data": rows
            });
          }
        });
      }
    });
  });

  // GET/centers/
  // returns a list of all centers
  app.get('/centers/', (req, res) => {
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection'); 
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        connection.query(`SELECT * FROM center`, function (err, rows, fields) {
          connection.release();
          if (err) {
            // if there is an error withID the query, log the error
            logger.error("Problem getting from table: \n", err);
            res.status(400).send('Problem getting table'); 
          } else {
            console.log(rows)
            res.status(200).json({
              "data": rows
            });
          }
        });
      }
    });
  });
  
  // POST/centers/
  // adds a new center to the database
  app.post('/centers/', (req, res) => {
    console.log(req.body);
    var address = req.body.address;
    var zip = req.body.zip_code;
    var name = req.body.name;
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection'); 
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        connection.query(`Insert INTO center(address, zip_code, name) VALUES(?,?,?) `, [address, zip, name], function (err, rows, fields) {
          connection.release();
          if (err) {
            // if there is an error withID the query, log the error
            logger.error("Problem getting from table: \n", err);
            res.status(400).send('Problem getting table'); 
          } else {
            console.log(rows)
            res.status(200).json({
              "data": rows
            });
          }
        });
      }
    });
  });

  // GET/centers/:center_id/parents
  // returns all parents that use the center with id center_id
  app.get('/centers/:center_id/parents', (req, res) => {
    var center_id = req.param('center_id');
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection'); 
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        connection.query(`SELECT * FROM parent WHERE center_id = ${center_id}`, function (err, rows, fields) {
          connection.release();
          if (err) {
            // if there is an error withID the query, log the error
            logger.error("Problem getting from table: \n", err);
            res.status(400).send('Problem getting table'); 
          } else {
            console.log(rows)
            res.status(200).json({
              "data": rows
            });
          }
        });
      }
    });
  });


  // GET/parents
  // returns all parent information
  app.get('/parents/', (req, res) => {
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection'); 
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        connection.query(`SELECT * FROM parent`, function (err, rows, fields) {
          connection.release();
          if (err) {
            // if there is an error withID the query, log the error
            logger.error("Problem getting from table: \n", err);
            res.status(400).send('Problem getting table'); 
          } else {
            console.log(rows)
            res.status(200).json({
              "data": rows
            });
          }
        });
      }
    });
  });


  // POST/parents/
  // Adds a new parent to the database
  app.post('/parents/', (req, res) => {
    console.log(req.body);
    var phone_number = req.body.phone_number;
    var name = req.body.name;
    var email = req.body.email;
    var center_id = req.body.center_id;
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection'); 
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        connection.query(`Insert INTO parent(phone_number, name, email, center_id) VALUES(?,?,?,?) `, [phone_number, name, email, center_id], function (err, rows, fields) {
          connection.release();
          if (err) {
            // if there is an error withID the query, log the error
            logger.error("Problem getting from table: \n", err);
            res.status(400).send('Problem getting table'); 
          } else {
            console.log(rows)
            res.status(200).json({
              "data": rows
            });
          }
        });
      }
    });
  });

  // GET all child information
  // /api/parents/{parentID}/kids
  app.get('/parents/:parent_id/kids', (req, res) => {
    var parent_id = req.param('parent_id');
    console.log(req.body);
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection'); 
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        connection.query(`SELECT * FROM child WHERE parent_id = ${req.params.parent_id}`, parent_id, function (err, rows, fields) {
          connection.release();
          if (err) {
            // if there is an error withID the query, log the error
            logger.error("Problem getting from table: \n", err);
            res.status(400).send('Problem getting table'); 
          } else {
            console.log(rows)
            res.status(200).json({
              rows
            });
          }
        });
      }
    });
  });

  app.post('/parents/:parent_id/kids', (req, res) => {
    var parent_id = req.param('parent_id');
    var age = req.body.age;
    var name = req.body.name;
    var center_id = req.body.center_id;
    var parent_id = req.body.parent_id;
    var room_id = req.body.room_id;
    console.log(req.body);
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection'); 
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        connection.query(`INSERT INTO child(age,name,center_id,parent_id,room_id) VALUES(?,?,?,?,?)`, [age,name,center_id,parent_id,room_id], function (err, rows, fields) {
          connection.release();
          if (err) {
            // if there is an error withID the query, log the error
            logger.error("Problem getting from table: \n", err);
            res.status(400).send('Problem getting table'); 
          } else {
            console.log(rows)
            res.status(200).json({
              "data": rows
            });
          }
        });
      }
    });
  });

  // GET/rooms
  // returns all rooms in the database
  app.get('/rooms/', (req, res) => {
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection'); 
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        connection.query(`SELECT * FROM room`, function (err, rows, fields) {
          connection.release();
          if (err) {
            // if there is an error withID the query, log the error
            logger.error("Problem getting from table: \n", err);
            res.status(400).send('Problem getting table'); 
          } else {
            console.log(rows)
            res.status(200).json({
              "data": rows
            });
          }
        });
      }
    });
  });

  // POST/rooms/
  // Adds a new room to the database
  app.post('/rooms/', (req, res) => {
    var room_name = req.body.room_name;
    var center_id = req.body.center_id;
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection'); 
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        connection.query(`INSERT INTO room(room_name,center_id) VALUES(?,?)`, [room_name,center_id], function (err, rows, fields) {
          connection.release();
          if (err) {
            // if there is an error withID the query, log the error
            logger.error("Problem getting from table: \n", err);
            res.status(400).send('Problem getting table'); 
          } else {
            console.log(rows)
            res.status(200).json({
              "data": rows
            });
          }
        });
      }
    });
  });
}