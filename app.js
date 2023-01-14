const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
const port = 4000;

app.use(cors());

// middleware
app.use(express.json({limit: '2mb'}));
app.use(express.urlencoded({ limit: '2mb', extended: false }));

const connection = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "password12345",
    database : "opencv_db"
});

app.get('/', (req, res) => {
    res.send('Hello World!');
})
app.get('/motion-list', (req, res) => {

    connection.query('SELECT * FROM movement_dtect', (err, user) => {
        
        // let buffer = Buffer.from(user[5].captured_image)

        // console.log(Buffer.from(user[0].captured_image));
        // res.send(buffer.toString('utf-8'));
        res.send(user);
    });
    
});
app.post('/camera', (req, res) => {

    connection.query("INSERT IGNORE INTO movement_dtect (date_time, captured_image) VALUES (?, ?)", [req.body.datetime, req.body.image], (err, result) => {
        if (err) throw err;

        try {
            if (result.affectedRows > 0) {
                res.json({message : "Data has been added!"});
            } else {
                res.json({message : "Something went wrong."});
            }
        } catch (err) {
            res.json({message : err})
        }
    });
});

app.post('/register', (req, res) => {
    const {username, email, password, cpassword} = req.body;

    connection.query(
        'INSERT INTO motion_users (username, email, password, cpassword) VALUES (?,?,?,?)',
        [username, email, password, cpassword],
        (err, results) => {
          if (err) {
            return res.status(500).json({ error: err.message });
          }
          res.json({ message: 'Data inserted successfully' });
        }
      );
})

app.listen(port, () => {
    console.log(`Server: http://localhost:${port}`);
});