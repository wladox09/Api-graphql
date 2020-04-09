const bcrypt = require('bcrypt');
const JsonWebToken = require("jsonwebtoken");
const db = require("../db");
const usersCollection = db.collection('users');

const login = async (email, password) => {
    var user = await db.query(`FOR u IN ${usersCollection.name} FILTER u.email == @email RETURN u`, {
        email: email
    }).then(
        cursor => cursor.map(doc => doc),
        err => console.error('Failed to fetch filter document:', err)
        );

    if(user[0] != undefined) {
        if (await bcrypt.compare(password, user[0].password)) {
            var token = JsonWebToken.sign({ email: user[0].email }, "bigsecret", { expiresIn: 3600 });
            return {"status": 200, "message": { "token": token } };
        }
    }
    return { "status": 401, "message": "Invalid Credentials" };
}

module.exports = login;