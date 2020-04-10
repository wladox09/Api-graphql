const getMessageOk = (message) => {
    return {
        "error": false,
        "message": message
    };
}

const getMessageError = (code) => {
    switch (code) {
        case 1:
            return {
                "error": true,
                "message": {
                    "en": "Invalid Credentials",
                    "es": "Credenciales no válidas"
                }
            };
            break;
            case 2:
                return {
                    "error": true,
                    "message": {
                        "en": "Duplicate email",
                        "es": "Correo electrónico duplicado"
                    }
                };
                break;
            case 3:
                return {
                    "error": true,
                    "message": {
                        "en": "Invalid authorization token",
                        "es": "Token de autorización inválido"
                    }
                };
                break;
        default:
            break;
    }
}



module.exports = { getMessageOk, getMessageError };