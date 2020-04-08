Database = require('arangojs').Database;

try {
    db = new Database('http://127.0.0.1:8529');
    db.useBasicAuth("al_natural", "al_natural");
    db.useDatabase('al_natural');
} catch (error) {
    console.log(error);
}

module.exports = db;