const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bcrypt = require('bcrypt');

const app = express();
const port = 4000;

const saltRounds = 10;

app.use(cors());

// middleware
app.use(express.json({limit: '2mb'}));
app.use(express.urlencoded({ limit: '2mb', extended: false }));

const connection = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "lunafamily123",
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
    const {username, email, password} = req.body;
    
    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash) {
            // Store hash in your password DB.
            connection.query(
                'INSERT INTO motion_users (username, email, password) VALUES (?,?,?)',
                [username, email, hash],
                (err, results) => {
                  if (err) {
                    return res.status(500).json({ error: err.message });
                  }
                  res.json({ message: 'Data inserted successfully' });
                }
              );
        });
    });    
})

app.post('/login-user', (req, res) => {
    
    const {email, password} = req.body;

   connection.query("SELECT * FROM motion_users WHERE email = ?", [email], async (err, user) => {
        
    if (err) throw err;

    try {
        if (user) {
            const match = await bcrypt.compare(password, user[0].password);
            if (match) {
                return res.json({ username : user[0].username, email: user[0].email, message: 'Success' });
            } else {
                return res.json({ message: 'Invalid email or password.' });
            }
        }
        return res.json({ message: 'Invalid email or password.' });
    } catch (err) {
        res.json({message: err})
    }
         
    });
})

app.post('/change-pass', (req, res) => {
    const {ses_email, opassword, npassword} = req.body;
    
    connection.query("SELECT * FROM motion_users WHERE email = ?", [ses_email], async (err, user) => {
        console.log(user)
        if (err) throw err;
    
        try {
            if (user) {
                const match = await bcrypt.compare(opassword, user[0].password);
                if (match) {
                    bcrypt.hash(npassword, saltRounds, function(err, result) {
                        if (err) throw err;

                        connection.query("UPDATE motion_users SET password = ? WHERE email = ?", [result, ses_email])
                        console.log("Success change pass.")
                    })
                    
                } else {
                    return res.json({ message: 'Old password does not match' });
                }
            }
            return res.json({ message: 'Invalid email or password.' });
        } catch (err) {
            res.json({message: err})
        }
             
        });   
})


app.post('/forgot-pass', (req, res) => {
    
    const {email} = req.body;

   connection.query("SELECT * FROM motion_users WHERE email = ?", [email], async (err, user) => {
        
    if (err) throw err;

    try {
        if (user) {
            return res.json({ username : user[0].username, email: user[0].email, message: 'Success' });
        }
        return res.json({ message: 'Email does not exist.' });
    } catch (err) {
        res.json({ message: 'Email does not exist.' })
    }
         
    });
})

app.post('/submit-pass', (req, res) => {
    
    const { email, password } = req.body;

    bcrypt.hash(password, saltRounds, function(err, result) {
        if (err) throw err;

        connection.query("UPDATE motion_users SET password = ? WHERE email = ?", [result, email], (err, user) => {
            console.log("Success set new pass.")
            return res.json({message : 'New Password Change.'})   
        })
    })

})

app.listen(port, () => {
    console.log(`Server: http://localhost:${port}`);
});