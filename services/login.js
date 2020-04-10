const bcrypt = require('bcrypt');
const JsonWebToken = require("jsonwebtoken");
const { getUserByEmail } = require("../providers/userProvider");
const { getMessageOk, getMessageError } = require("../handlerMessage");

const login = async (email, password) => {
    var user = await getUserByEmail(email);
    if(user != null) {
        if (await bcrypt.compare(password, user.password)) {
            var token = JsonWebToken.sign({ email: user.email }, process.env.JWTSECRET, { expiresIn: 3600 });
            return getMessageOk({ "token": token });
        }
    }
    return getMessageError(1);
}

module.exports = login;