const JsonWebToken = require("jsonwebtoken");
const { getMessageError } = require("../handlerMessage");

const authorization = (request, response, next) => {
    var authHeader = request.headers["authorization"];
    if(authHeader != undefined) {
        var bearerToken = authHeader.split(" ");
        if(bearerToken.length == 2 && bearerToken[0].toLowerCase() == "bearer") {
            JsonWebToken.verify(bearerToken[1], process.env.JWTSECRET, function(error, decodedToken) {
                if(error) {
                    response.json(getMessageError(3));
                }
                request.decodedToken = decodedToken;
                next();
            });
        } else {
            response.json(getMessageError(3));
        }
    } else {
        response.json(getMessageError(3));
    }
}

module.exports = authorization;