const express = require('express');
let mysql = require('mysql2');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get ('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Deandwib12345*',
    database: 'biodata',
    port: 3308
}); 

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:' + err,stack);
        return;
    }
    console.log('Connected successfully.');
});

app.get('/api/users', (req, res) =>{
    db.query = ('SELECT" * FROM users', (err, stack) => {
        if (err) {
            console.error('Error executing query:' + err,stack);
            res.status(500).send('error ferching users');
            return;
        }
        res.json(results);
    });
});

