const fs = require('fs-extra')
const shortid = require('shortid');
var lodash = require('lodash');

class Ranidb {
    constructor(path_db) {
        this.path_db = path_db;
    }


    ensureFile(callback) {
        if (fs.existsSync(this.path_db)) {
            return callback();
        } else {
            fs.writeFileSync(this.path_db, JSON.stringify([]), { flag: 'wx' }, function (err, data) {

            })
            return "Create DB";
        }
    }

    save(data) {
        data = JSON.stringify(data);
        this.ensureFile(() => {
            fs.writeFileSync(this.path_db, data, { encoding: "utf-8" }, err => {
                if (err) {
                    return console.error(err)
                }
            })
        })
    }

    getAll() {
        let db = this.ensureFile(() => {
            let data = fs.readFileSync(this.path_db, { encoding: "utf-8" });
            return JSON.parse(data);
        })
        return db
    }

    push(data) {
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

    findIndex(data) {
        let db = this.getAll();
        return lodash.findIndex(db, data);
    }

    filter(data) {
        let db = this.getAll();
        return lodash.filter(db, data);
    }

    map(fun) {
        let db = this.getAll();
        return lodash.map(db, data);
    }

    updata(id, data) {
        let db = this.getAll();
        let index = this.findIndex({ _id: id });
        db[index] = data;
        return this.save(db);
    }
}

module.exports = Ranidb