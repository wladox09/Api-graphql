const db = require("../db");
const usersCollection = db.collection('users');

const getUser = async (id) => {
    var user = await db.query(`FOR u IN ${usersCollection.name} FILTER u.id == @id RETURN u`, {
        id: id
    }).then(
        cursor => cursor.map(doc => doc),
        err => console.error('Failed to fetch filter document.')
    );
    return user[0];
}

const getUsers = async () => {
    var users = await usersCollection.all().then(
        cursor => cursor.map(doc => doc),
        err => console.error('Failed to fetch all documents.')
    );
    return users != undefined ? users : [];
}

const update = async (user) => {
    var userOld = await getUser(user.id);
    user = await usersCollection.update(userOld, user).then(
        meta => meta,
        err => console.error('Failed to update document.')
    );
    return await usersCollection.document(user);
}

module.exports = {
    user: getUser,
    users: getUsers,
    update: update,
};