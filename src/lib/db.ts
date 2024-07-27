import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
<<<<<<< HEAD
  password: '',
  database: 'data',
=======
  password: '22b01a12b3@A',
  database: 'datamodular',
>>>>>>> 828dd7cc25c896c1c8c5e672d11489539a8629aa
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;