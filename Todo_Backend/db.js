const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'W3_86897_Ritik',      
  password: 'manager',      
  database: 'todo_app' 
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to MySQL database.');
});

module.exports = db;
