const { uuid } = require('uuidv4');
const bcrypt = require('bcrypt');
const db = require("../db");
const usersCollection = db.collection('users');
const saltRounds = 10;

const singIn = async (email, password, name, lastName) => {
    if (await _isEmailExist(email)) {
        user = {"email": email, "password": password, "name": name, "lastName": lastName};
        user.id = uuid();
        user.password = await bcrypt.hash(user.password, saltRounds);
        user = await usersCollection.save(user).then(
            meta => meta,
            err => console.error('Failed to save document:', err)
        );
        const result = await usersCollection.document(user);
        return {"id": result.id, "email": result.email, "name": result.name, "lastName": result.lastName};
    }
    return {"status": 401, "message": "Error Email duplicate"}
}

async function _isEmailExist(email) {
    var user = await db.query(`FOR u IN ${usersCollection.name} FILTER u.email == @email RETURN u`, {
        email: email
    }).then(
        cursor => cursor.map(doc => doc),
        err => console.error('Failed to fetch filter document:', err)
    );
    return user.lenght > 0 ? true : false;
}

module.exports = singIn;