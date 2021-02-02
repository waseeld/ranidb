const fs = require('fs');
const shortid = require('shortid');
var lodash = require('lodash');
const { findIndex } = require('lodash');

class Ranidb {
    constructor(path_db) {
        this.path_db = path_db;
    }

    save(data) {
        data = JSON.stringify(data);
        fs.writeFileSync(this.path_db, data, { encoding: "utf-8" }, err => {
            if (err) {
                return console.error(err)
            }
        })
        //done
        console.log("done");
    }

    getAll() {
        let data = fs.readFileSync(this.path_db, { encoding: "utf-8" });
        return JSON.parse(data);
    }

    insert(data) {
        let db = this.getAll();
        data = {
            _id: shortid.generate(),
            ...data
        };
        db.push(data);
        this.save(db);
        return data
    }

    find(data) {
        let db = this.getAll();
        return lodash.find(db, data);
    }

    findIndex(data){
        let db = this.getAll();
        return lodash.findIndex(db, data);
    }

    filter(data) {
        let db = this.getAll();
        return lodash.filter(db, data);
    }

    updata(id, data) {
        let db = this.getAll();
        let index = this.findIndex({_id: id});
        db[index] = data;
        return this.save(db);
    }
}

module.exports = Ranidb