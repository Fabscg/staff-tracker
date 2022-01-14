const express = require('express');
const mysql = require('mysql2');
const cTable = require('console.table');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false })) 
app.use(express.json())

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Mon@M@rvin',
        database: 'employee_tracker'
    },
    console.log('Connected to  the database.')
);

app.listen(POST, () => {
    console.log(`Server running on port ${PORT}`);
})