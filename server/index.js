const express = require('express');
const sql = require('sql');

const app = express();
app.use(express.json());
const db = mysql.createConnection({
    user: "root",
    password: "password",
    host: "localhost",
    database: "LoginSystem"
});

app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    db.query(
        "SELECT * FROM users Where username = ? password = ?", [username, password], (err, result) => {
            if (err) {
                res.send({
                    err: err
                });
            }

            if (result) {
                res.send(result);
            } else {
                res.send({ message: "Wrong username or password" })
            }
        }
    );
});




app.listen(3001, () => {
    console.log("running server");
});