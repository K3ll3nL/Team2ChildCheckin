const pool = require('./db');
const jwt = require('jsonwebtoken');

module.exports = function routes(app, logger) {
  // GET /
  // Shows all tables
  app.get('/', (req, res) => {
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection) {
      if (err) {
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection', err)
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
  // returns a list xof all centers
  app.get('/centers/', (req, res) => {
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection) {
      if (err) {
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection', err)
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
    pool.getConnection(function (err, connection) {
      if (err) {
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection', err)
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

  // GET/centers/:center_id/name
  // returns the name of center_id
  app.get('/centers/center_id/name', (req, res) => {
    var center_id = req.param('center_id');
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection) {
      if (err) {
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection', err)
        res.status(400).send('Problem obtaining MySQL connection');
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        connection.query(`SELECT name FROM center WHERE center_id = ${center_id}`, function (err, rows, fields) {
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
    pool.getConnection(function (err, connection) {
      if (err) {
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection', err)
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

  // GET/employee/:child_id
  // returns the employee watching child of child_id
  app.get('/employee/:child_id', (req, res) => {
    var child_id = req.param('child_id');
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection'); 
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        connection.query(`SELECT employee.employee_id, employee.name, employee.username, employee.password, employee.email, employee.center_id, employee.room_id FROM employee JOIN room r on employee.room_id = r.room_id JOIN child c on r.room_id = c.room_id WHERE c.child_id = ${child_id}`, function (err, rows, fields) {
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
    pool.getConnection(function (err, connection) {
      if (err) {
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection', err)
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
    pool.getConnection(function (err, connection) {
      if (err) {
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection', err)
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

  //GET /parents/:child_id
  // returns the parent information related to child of child_id
  app.get('/parents/:child_id', (req, res) => {
    var child_id = req.param('child_id');
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection'); 
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        connection.query(`SELECT * FROM parent JOIN child c on parent.parent_id = c.parent_id WHERE child_id = 1`, function (err, rows, fields) {
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
  app.get('/parents/parent_id/kids', (req, res) => {
    var parent_id = req.param('parent_id');
    console.log(req.body);
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection) {
      if (err) {
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection', err)
        res.status(400).send('Problem obtaining MySQL connection');
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        connection.query(`SELECT * FROM child WHERE parent_id = ${parent_id}`, parent_id, function (err, rows, fields) {
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
    pool.getConnection(function (err, connection) {
      if (err) {
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection', err)
        res.status(400).send('Problem obtaining MySQL connection');
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        connection.query(`INSERT INTO child(age,name,center_id,parent_id,room_id) VALUES(?,?,?,?,?)`, [age, name, center_id, parent_id, room_id], function (err, rows, fields) {
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
    pool.getConnection(function (err, connection) {
      if (err) {
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection', err)
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

  //GET /kids
  // returns all kids in the database
  app.get('/kids/', (req, res) => {
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection) {
      if (err) {
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection', err)
        res.status(400).send('Problem obtaining MySQL connection');
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        connection.query(`SELECT * FROM child`, function (err, rows, fields) {
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


  // app.get('/roomsById', (req, res) => {
  //   // obtain a connection from our pool of connections
  //   pool.getConnection(function (err, connection){
  //     if(err){
  //       // if there is an issue obtaining a connection, release the connection instance and log the error
  //       logger.error('Problem obtaining MySQL connection',err)
  //       res.status(400).send('Problem obtaining MySQL connection'); 
  //     } else {
  //       // if there is no issue obtaining a connection, execute query and release connection
  //       connection.query(`SELECT * FROM room WHERE room.center_id = ?`, [req.param('center_id')],function (err, rows, fields) {
  //         connection.release();
  //         if (err) {
  //           // if there is an error withID the query, log the error
  //           logger.error("Problem getting from table: \n", err);
  //           res.status(400).send('Problem getting table'); 
  //         } else {
  //           console.log(rows)
  //           res.status(200).json({
  //             "data": rows
  //           });
  //         }
  //       });
  //     }
  //   });
  // });

  // app.get('/kidsByRoomId', (req, res) => {
  //   // obtain a connection from our pool of connections
  //   pool.getConnection(function (err, connection){
  //     if(err){
  //       // if there is an issue obtaining a connection, release the connection instance and log the error
  //       logger.error('Problem obtaining MySQL connection',err)
  //       res.status(400).send('Problem obtaining MySQL connection'); 
  //     } else {
  //       // if there is no issue obtaining a connection, execute query and release connection
  //       connection.query(`SELECT * FROM child WHERE center_id=?`, [req.param('center_id')],function (err, rows, fields) {
  //         connection.release();
  //         if (err) {
  //           // if there is an error withID the query, log the error
  //           logger.error("Problem getting from table: \n", err);
  //           res.status(400).send('Problem getting table'); 
  //         } else {
  //           console.log(rows)
  //           res.status(200).json({
  //             "data": rows
  //           });
  //         }
  //       });
  //     }
  //   });
  // });

  // app.get('/employeesByCenterId', (req, res) => {
  //   // obtain a connection from our pool of connections
  //   pool.getConnection(function (err, connection){
  //     if(err){
  //       // if there is an issue obtaining a connection, release the connection instance and log the error
  //       logger.error('Problem obtaining MySQL connection',err)
  //       res.status(400).send('Problem obtaining MySQL connection'); 
  //     } else {
  //       // if there is no issue obtaining a connection, execute query and release connection
  //       connection.query(`SELECT * FROM employee WHERE center_id=?`, [req.param('center_id')],function (err, rows, fields) {
  //         connection.release();
  //         if (err) {
  //           // if there is an error withID the query, log the error
  //           logger.error("Problem getting from table: \n", err);
  //           res.status(400).send('Problem getting table'); 
  //         } else {
  //           console.log(rows)
  //           res.status(200).json({
  //             "data": rows
  //           });
  //         }
  //       });
  //     }
  //   });
  // });

  // POST/rooms/
  // Adds a new room to the database
  app.post('/rooms/', (req, res) => {
    var room_name = req.body.room_name;
    var center_id = req.body.center_id;
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection) {
      if (err) {
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection', err)
        res.status(400).send('Problem obtaining MySQL connection');
      } else {
        // if there is no issue obtaining a connection, execute query and release connection

        connection.query(`INSERT INTO room(room_name,center_id) VALUES(?,?)`, [room_name, center_id], function (err, rows, fields) {

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


  //GET/employees
  //returns all employees in the database
  app.get('/employees', (req, res) => {
    pool.getConnection(function (err, connection) {
      if (err) {

        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection', err)
        res.status(400).send('Problem obtaining MySQL connection');
      } else {
        // if there is no issue obtaining a connection, execute query and release connection

        connection.query(`SELECT * FROM employee`, function (err, rows, fields) {


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


  //GET/parents
  //returns all parents in the database
  app.get('/parents', (req, res) => {
    pool.getConnection(function (err, connection) {
      if (err) {

        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection', err)
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



  //POST/createUser
  //Creates a new user in the database
  app.post('/users', (req, res) => {
    pool.getConnection(function (err, connection) {
      const accessTokenSecret = 'mysupercoolsecret';
      if (err) {


        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection', err)
        res.status(400).send('Problem obtaining MySQL connection');
      } else {
        // if there is no issue obtaining a connection, execute query and release connection

        if (req.body.is_employee === true) {
          //check if employee is already in the database
          connection.query(`SELECT * FROM employee WHERE username=?`, [req.body.username], function (err, rows, fields) {
            if (err) {
              // if there is an error withID the query, log the error
              logger.error("Problem getting from table: \n", err);
              res.status(400).send('Problem getting table');
            } else {
              if (rows.length > 0) {
                res.status(400).send('Employee already exists');
              } else {
                connection.query(`INSERT INTO employee(username,password,email,center_id, name) VALUES(?,?,?,?,?)`, [req.body.username, req.body.password, req.body.email, req.body.center_id, req.body.name], function (err, rows, fields) {
                  if (err) {
                    // if there is an error withID the query, log the error
                    logger.error("Problem getting from table: \n", err);
                    res.status(400).send('Problem getting table');
                  } else {
                    console.log(rows)
                    // res.status(200).json({
                    //   "data": rows
                    // });
                  }
                });
                connection.query(`SELECT * FROM employee WHERE username = ? AND password = ?`, [req.body.username, req.body.password], function (err, rows, fields) {
                  if (err) {
                    // if there is an error withID the query, log the error
                    logger.error("Problem getting from table: \n", err);
                    res.status(400).send('Problem getting table');
                  } else {
                    console.log(rows)
                    if (rows.length > 0) {
                      const token = jwt.sign({
                        user_id: rows[0].employee_id,
                        is_employee: true,
                      }, accessTokenSecret, {
                        expiresIn: '1h'
                      });
                      connection.release();
                      res.status(200).json({
                        "token": token
                      });
                    } else {
                      res.status(400).send('Invalid username or password');
                    }
                  }
                });
              }
            }
          });
        }
        else {
          //check if parent is already in the database
          connection.query(`SELECT * FROM parent WHERE username=?`, [req.body.username], function (err, rows, fields) {
            if (err) {
              // if there is an error withID the query, log the error
              logger.error("Problem getting from table: \n", err);
              res.status(400).send('Problem getting table');
            } else {
              if (rows.length > 0) {
                res.status(400).send('Parent already exists');
              } else {
                connection.query(`INSERT INTO parent(username,password,email,center_id, name) VALUES(?,?,?,?,?)`, [req.body.username, req.body.password, req.body.email, req.body.center_id, req.body.name], function (err, rows, fields) {
                  if (err) {
                    // if there is an error withID the query, log the error
                    logger.error("Problem getting from table: \n", err);
                    res.status(400).send('Problem getting table');
                  } else {
                    console.log(rows)
                    // res.status(200).json({
                    //   "data": rows
                    // });
                  }
                });
                connection.query(`SELECT * FROM parent WHERE username = ? AND password = ?`, [req.body.username, req.body.password], function (err, rows, fields) {

                  if (err) {
                    // if there is an error withID the query, log the error
                    logger.error("Problem getting from table: \n", err);
                    res.status(400).send('Problem getting table');
                  } else {
                    console.log(rows)
                    if (rows.length > 0) {
                      const token = jwt.sign({
                        user_id: rows[0].parent_id,
                        is_employee: false,
                      }, accessTokenSecret, {
                        expiresIn: '1h'
                      });
                      connection.release();
                      res.status(200).json({
                        "token": token
                      });
                    } else {
                      res.status(400).send('Invalid username or password');
                    }
                  }
                });
              }

            }
          });

        }
      }
    });
  });

  //POST/login
  //Logs in a user
  app.post('/login', (req, res) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection', err)
        res.status(400).send('Problem obtaining MySQL connection');
      } else {
        const accessTokenSecret = 'mysupercoolsecret';
        // if there is no issue obtaining a connection, execute query and release connection

        connection.query(`SELECT * FROM employee WHERE username = ? AND password = ?`, [req.body.username, req.body.password], function (err, rows, fields) {

          if (err) {
            // if there is an error withID the query, log the error
            logger.error("Problem getting from table: \n", err);
            res.status(400).send('Problem getting table');
          } else {
            console.log(rows)
            if (rows.length > 0) {
              connection.release();
              const token = jwt.sign({
                user_id: rows[0].employee_id,
                center_id: rows[0].center_id,
                name: rows[0].name,
                is_employee: true,
              }, accessTokenSecret, {
                expiresIn: '1h'
              });
              res.status(200).json({
                "data": rows,
                "token": token
              });
            } else {
              connection.query(`SELECT * FROM parent WHERE username = ? AND password = ?`, [req.body.username, req.body.password], function (err, rows, fields) {
                connection.release();
                if (err) {
                  // if there is an error withID the query, log the error
                  logger.error("Problem getting from table: \n", err);
                  res.status(400).send('Problem getting table');
                } else {
                  console.log(rows)
                  if (rows.length > 0) {
                    const token = jwt.sign({
                      user_id: rows[0].parent_id,
                      center_id: rows[0].center_id,
                      name: rows[0].name,
                      is_employee: false,
                    }, accessTokenSecret, {
                      expiresIn: '1h'
                    });
                    res.status(200).json({
                      "data": rows,
                      "token": token
                    });
                  } else {
                    res.status(400).send('Invalid username or password');
                  }
                }
              });
            }
          }
        });






      }
    });
  });

  //GET /rooms/centerID
  //returns all rooms in a given center
  app.get('/rooms/:center_id', (req, res) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection', err)
        res.status(400).send('Problem obtaining MySQL connection');
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        connection.query(`SELECT * FROM room WHERE center_id = ?`, [req.params.center_id], function (err, rows, fields) {
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

  //GET /kids/centerID
  //returns all kids in a given center
  app.get('/kids/:center_id', (req, res) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection', err)
        res.status(400).send('Problem obtaining MySQL connection');
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        connection.query(`SELECT * FROM child WHERE center_id = ?`, [req.params.center_id], function (err, rows, fields) {
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

  //GET /kids/centerID/roomID
  //returns all kids in a given room
  app.get('/kids/:center_id/:room_id', (req, res) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection', err)
        res.status(400).send('Problem obtaining MySQL connection');
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        connection.query(`SELECT * FROM child WHERE center_id = ? AND room_id = ?`, [req.params.center_id, req.params.room_id], function (err, rows, fields) {
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

  //GET /employees/centerID
  //returns all employees in a given center
  app.get('/employees/:center_id', (req, res) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection', err)
        res.status(400).send('Problem obtaining MySQL connection');
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        connection.query(`SELECT * FROM employee WHERE center_id = ?`, [req.params.center_id], function (err, rows, fields) {
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

  //GET /employees/centerID/roomID
  //returns all employees in a given room
  app.get('/employees/:center_id/:room_id', (req, res) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection', err)
        res.status(400).send('Problem obtaining MySQL connection');
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        connection.query(`SELECT * FROM employee WHERE center_id = ? AND room_id = ?`, [req.params.center_id, req.params.room_id], function (err, rows, fields) {

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


  //GET /centers/:centerID
  //returns all information about a given center
  app.get('/centers/:center_id', (req, res) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection', err)
        res.status(400).send('Problem obtaining MySQL connection');
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        connection.query(`SELECT * FROM center WHERE center_id = ?`, [req.params.center_id], function (err, rows, fields) {
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

  //GET /parents/:parentID/centerID
  //returns the center id of a given parent
  app.get('/parents/:parent_id/center_id', (req, res) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection', err)
        res.status(400).send('Problem obtaining MySQL connection');
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        connection.query(`SELECT center_id FROM parent WHERE parent_id = ?`, [req.params.parent_id], function (err, rows, fields) {
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

  //PUT /kids/:child_id
  //updates the room information of a kid


  //PUT /employees/:employee_id
  //updates the information room of an employee
  app.put('/employees/:employee_id', (req, res) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection', err)
        res.status(400).send('Problem obtaining MySQL connection');
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        connection.query('UPDATE employee SET room_id = ? WHERE employee_id = ? ', [req.body.room_id, req.params.employee_id], function (err, rows, fields) {
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

  //POST /kids
  //adds a kid to the database
  app.post('/kids', (req, res) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection', err)
        res.status(400).send('Problem obtaining MySQL connection');
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        connection.query('INSERT INTO child (name, parent_id, room_id, age, health, center_id, behavior) VALUES (?, ?, ?, ?, ?, ?, ?)', [req.body.name, req.body.parent_id, req.body.room_id, req.body.age, req.body.health, req.body.center_id, req.body.behavior], function (err, rows, fields) {
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

  //GET /centerByParent_id
  //returns the center id of a given parent
  app.get('/centerByParent_id', (req, res) => {
    var parent_id = req.param('parent_id');
    pool.getConnection(function (err, connection) {
      if (err) {
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection', err)
        res.status(400).send('Problem obtaining MySQL connection');
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        connection.query(`SELECT center_id FROM parent WHERE parent_id = ${parent_id}`, function (err, rows, fields) {
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

  //PUT /kids
  //updates the information of a kid
  app.put('/kids/:child_id', (req, res) => {
    console.log(req.body);
    pool.getConnection(function (err, connection) {
      if (err) {
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection', err)
        res.status(400).send('Problem obtaining MySQL connection');
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        connection.query('UPDATE child SET name = ?, parent_id = ?, room_id = ?, age = ?, health = ?, center_id = ?, behavior = ?,checked_in = ? WHERE child_id = ?', [req.body.name, req.body.parent_id, req.body.room_id, req.body.age, req.body.health, req.body.center_id, req.body.behavior, req.body.checked_in, req.params.child_id], function (err, rows, fields) {
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

  //GET /notes/:child_id
  //returns the notes of a given child
  app.get('/notes/:child_id', (req, res) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection', err)
        res.status(400).send('Problem obtaining MySQL connection');
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        connection.query(`SELECT * FROM notes WHERE child_id = ?`, [req.params.child_id], function (err, rows, fields) {
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


  app.post('/notes/:child_id', (req, res) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection', err)
        res.status(400).send('Problem obtaining MySQL connection');
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        connection.query(`INSERT INTO notes (child_id,note) values (?,?)`, [req.params.child_id, req.body.note], function (err, rows, fields) {
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

  app.put('/parents/parent_id/removeCenter', (req, res) => {
    var parent_id = req.body.parent_id;
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection) {
      if (err) {
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection', err)
        res.status(400).send('Problem obtaining MySQL connection');
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        connection.query(`update parent set center_id = -1 where parent_id = ${parent_id}`, function (err, rows, fields) {
          if (err) {
            // if there is an error withID the query, log the error
            logger.error("Problem getting from table: \n", err);
            res.status(400).send('Problem getting table');
          } else {
            connection.query(`update child set center_id = -1 where parent_id = ${parent_id}`, function (err, rows, fields) {
              if (err) {
                // if there is an error withID the query, log the error
                logger.error("Problem getting from table: \n", err);
                res.status(400).send('Problem getting table');
              } else {
                console.log(rows)
              }



              connection.release();


            });

          }
        });

      }
    });
  })

  //GET /notes/:child_id
  //returns the notes of a given child
  app.get('/notes/:child_id', (req, res) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection', err)
        res.status(400).send('Problem obtaining MySQL connection');
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        connection.query(`SELECT * FROM note WHERE child_id = ?`, [req.params.child_id], function (err, rows, fields) {
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

  //GET /reviews/:center_id
  //returns the reviews of a given center
  app.get('/reviews/:center_id', (req, res) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection', err)
        res.status(400).send('Problem obtaining MySQL connection');
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        connection.query(`SELECT * FROM review WHERE center_id = ?`, [req.params.center_id], function (err, rows, fields) {
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

  //POST /reviews
  //adds a review to the database
  app.post('/reviews', (req, res) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection', err)
        res.status(400).send('Problem obtaining MySQL connection');
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        connection.query('INSERT INTO review (center_id, rating, text) VALUES (?, ?, ?)', [req.body.center_id, req.body.rating, req.body.text], function (err, rows, fields) {
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

  //GET /roomInfo/:room_id
  //returns details of a given room
  app.get('/roomInfo/:room_id', (req, res) => {
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection'); 
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        connection.query(`SELECT * FROM room WHERE room_id = ?`, [req.params.room_id], function (err, rows, fields) {
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


  app.put('/parents/parent_id/updateCenter', (req, res) => {
    var parent_id = req.body.parent_id;
    var center_id = req.body.center_id;
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection) {
      if (err) {
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection', err)
        res.status(400).send('Problem obtaining MySQL connection');
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        connection.query(`update parent set center_id = ${center_id} where parent_id = ${parent_id}`, function (err, rows, fields) {
          if (err) {
            // if there is an error withID the query, log the error
            logger.error("Problem getting from table: \n", err);
            res.status(400).send('Problem getting table');
            connection.query(`update child set center_id = ${center_id} where parent_id = ${parent_id}`, function (err, rows, fields) {
              if (err) {
                // if there is an error withID the query, log the error
                logger.error("Problem getting from table: \n", err);
                res.status(400).send('Problem getting table');
              } else {
                console.log(rows)
              }



              connection.release();




            });

          }
        });

      }
    });
  });

  //PUT /parents/
  //updates a parent's information
  app.put('/parents/:parent_id', (req, res) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection', err)
        res.status(400).send('Problem obtaining MySQL connection');
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        connection.query(`UPDATE parent SET phone_number = ?, name = ?, email = ?, username = ?, password = ?, center_id = ? WHERE parent_id = ?`, [req.body.phone_number, req.body.name, req.body.email, req.body.username, req.body.password, req.body.center_id, req.params.parent_id], function (err, rows, fields) {
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
