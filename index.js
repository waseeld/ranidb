const fs = require('fs-extra')
const shortid = require('shortid');
var lodash = require('lodash');

class Ranidb {
    _default: {
        idType: 'random'
    }

    constructor(path_db, setting = this.default) {
        this.path_db = path_db;
        this.setType(setting.idType);
    }

    setType(type) {
        const types = ["random", "empty", "gradual"];
        const index = types.indexOf(type);
        if (index !== -1) {
            this.idType = index + 1;
        } else {
            console.log("idType is not correct")
            this.idType = 1;
        }
    }

    ensureFile(callback) {
        if (fs.existsSync(this.path_db)) {
            return callback();
        } else {
            fs.writeFileSync(this.path_db, JSON.stringify([]), { flag: 'wx' })
            return "Not found db\nCreate new DB";
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

        let all = this.getAll();

        let lastId = all.length ? (all[all.length - 1]._id + 1) : 1;

        let db = all;

        let _id = undefined;

        if (this.idType === 0) {
            _id = shortid.generate()
        } else if (this.idType === 3) _id = lastId

        data = {
            _id: _id,
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
        return lodash.map(db, fun);
    }

    updata(id, data) {
        let db = this.getAll();
        let index = this.findIndex({ _id: id });
        db[index] = data;
        return data;
    }
}

module.exports = Ranidb
