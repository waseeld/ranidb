const fs = require('fs');
const shortid = require('shortid');
var lodash = require('lodash');

module.exports = class Ranidb {
    constructor(path_db) {
        this.path_db = path_db;
    }

    getAll() {
        let data = fs.readFileSync(this.path_db, { encoding: "utf-8" });
        return JSON.parse(data);
    }

    insert(data) {
        let db = this.getAll();
        data["_id"] = shortid.generate();
        db.push(data);
        db = JSON.stringify(db)
        fs.writeFileSync(this.path_db, db, { encoding: "utf-8" }, err => {
            if (err) {
                return console.error(err)
            }

            //done
        })
        return data
    }

    find(data) {
        let db = this.getAll();
        return lodash.find(db, data);
    }

    filter(data){
        let db = this.getAll();
        return lodash.filter(db, data);
    }
}