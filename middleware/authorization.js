const JsonWebToken = require("jsonwebtoken");

const authorization = (request, response, next) => {
    var authHeader = request.headers["authorization"];
    if(authHeader != undefined) {
        var bearerToken = authHeader.split(" ");
        if(bearerToken.length == 2 && bearerToken[0].toLowerCase() == "bearer") {
            JsonWebToken.verify(bearerToken[1], "bigsecret", function(error, decodedToken) {
                if(error) {
                    response.json({ "status": 401, "message": "Invalid authorization token" });
                }
                request.decodedToken = decodedToken;
                next();
            });
        } else {
            response.json({ "status": 401, "message": "Invalid authorization token" });
        }
    } else {
        response.json({ "status": 401, "message": "Invalid authorization token" });
    }
}

module.exports = authorization;