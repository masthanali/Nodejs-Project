var Connection = require('tedious').Connection;
var Request = require('tedious').Request;

var config = {
    userName: 'gbadmin', // update me
    password: 'admin@2010', // update me
    server: '192.168.0.47'
  }

  var connection = new Connection(config);

  connection.on('connect', function(err) {
    if (err) {
      console.log(err);
    } else {
      executeStatement();
    }
  });


  function executeStatement() {
    request = new Request("select top 1 * from db_plumb_io_1464_New.dbo.Contact", function(err, rowCount) {
      if (err) {
        console.log(err);
      } else {
        console.log(rowCount + ' rows');
      }
      connection.close();
    });


    request.on('row', function(columns) {
        columns.forEach(function(column) {
          if (column.value === null) {
            console.log('NULL');
          } else {
            console.log(column.value);
          }
        });
      });
    
      connection.execSql(request);
    }
