const mysql = require('mysql');

const connection = mysql.createConnection({
  host: '192.168.1.140',
  user: 'nano',
  password: 'Patata1234',
  database: 'xarketing',
});

connection.connect((error) => {
  if (error) {
    console.error('Error al conectar a la base de datos:', error);
  } else {
    console.log('Conexión exitosa a la base de datos');
  }
});

module.exports = connection;
