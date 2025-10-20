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
app.post('/api/users', (req, res) => {
    const { name, nim, kelas } = req.body;

    if (!name || !nim || !kelas) {
        return res.status(400).json({message: "Nama, NIM dan Kelas wajib diisi."});
    }

    db.query(
        "INSERT INTO users (name, nim, kelas) VALUES (?, ?, ?)",
        [name, nim, kelas],
        (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Database error'});
            }
            res.status(201).json({ message: "User added successfully" });
        }
    )
});

app.put('/api/users/:id', (req, res) => {
    const userId = req.params.id;
    const { name, nim, kelas } = req.body;
    db.query(
        "UPDATE users SET name = ?, nim = ?, kelas = ? WHERE id = ?",
        [name, nim, kelas, userId],
        (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Database error'});
            }
            res.json({ message: "User updated successfully" });
        }
    )
});

app.delete('/api/users/:id', (req, res) => {
    const userId = req.params.id;
    db.query('DELETE FROM users WHERE id = ?', [userId], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Database error' });
        }
        res.json({ message: 'User deleted successfully' });
    })
});



