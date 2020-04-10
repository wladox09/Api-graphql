const db = require("../db");
const usersCollection = db.collection('users');
const { uuid } = require('uuidv4');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const getUserByEmail = async (email) => {
    var user = await db.query(`FOR u IN ${usersCollection.name} FILTER u.email == @email RETURN u`, {
        email: email,
    }).then(
        cursor => cursor.map(doc => doc),
        err => console.error('Failed to fetch filter document.')
    );

    return user != undefined ? user[0] : null;
}

const createUser = async (user) => {
    user.id = uuid();
    user.password = await bcrypt.hash(user.password, saltRounds);
    user = await usersCollection.save(user).then(
        meta => meta,
        err => console.error('Failed to save document.')
    );
    const result = await usersCollection.document(user);
    return {"id": result.id, "email": result.email, "name": result.name, "lastName": result.lastName};
}

module.exports = { getUserByEmail, createUser };

