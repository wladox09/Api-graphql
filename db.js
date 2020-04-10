Database = require('arangojs').Database;

class DB {
    constructor() {
        if (typeof DB.instance === "object") {
            return DB.instance;
        }
        try {
            this.db = new Database(process.env.DBHOST);
            this.db.useBasicAuth(process.env.DBUSER, process.env.DBPASSWORD);
            this.db.useDatabase(process.env.DBNAME);
        } catch (error) {
            console.log(error);
        }
        DB.instance = this;
        return this;
    }
}

module.exports = new DB().db;