const { createUser, getUserByEmail } = require("../providers/userProvider");
const { getMessageOk, getMessageError } = require("../handlerMessage");

const singIn = async (email, password, name, lastName) => {
    if (await getUserByEmail(email) == null) {
        var user = await createUser({
            "email": email,
            "password": password,
            "name": name,
            "lastName": lastName});
        return getMessageOk(user);
    }
    return getMessageError(2);
}

module.exports = singIn;