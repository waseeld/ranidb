"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
const fs = __importStar(require("fs-extra"));
const shortid = __importStar(require("shortid"));
const lodash = __importStar(require("lodash"));
// class raniObj extends Object {
//     filter() {
//       console.log(this.filter.that);
//     }
//     delete() {
//       return this.filter.that.delete();
//     }
//     updata(data) {
//       return this.filter.that.updata([data]);
//     }
//     put(data) {
//       return this.filter.that.put(data);
//     }
// }
// class raniArray extends Array {
//     db() {
//       return this.db.that;
//     }
//     delete() {
//       let db = this.db();
//       this.forEach((e) => {
//         let data = db.getAll();
//         data.splice(db.findIndex(e), 1);
//         db.save(data);
//       });
//       return db.getAll();
//     }
//     updata(data = []) {
//       let db = this.db();
//       let array = db.getAll();
//       this.forEach((e) => {
//         let newItem;
//         if (!Array.isArray(data)) {
//           newItem = data;
//         } else {
//           newItem = data[this.indexOf(e)];
//         }
//         let index = db.findIndex(e);
//         array[index] = newItem;
//       });
//       db.save(array);
//       return db.getAll();
//     }
//     put(data) {
//       let db = this.db();
//       let array = db.getAll();
//       this.forEach((e) => {
//         let index = db.findIndex(e);
//         let newItem;
//         if (!Array.isArray(data)) {
//           newItem = data;
//         } else {
//           newItem = data[this.indexOf(e)];
//         }
//         for (let key in newItem) {
//           e[key] = newItem[key];
//         }
//         array[index] = e;
//       });
//       db.save(array);
//       return db.getAll();
//     }
// }
class Ranidb {
    constructor(path_db, Options = { idType: "random" }) {
        this.path_db = path_db;
        this.setType(Options.idType);
        this.fileExist();
    }
    setType(type) {
        const types = ["random", "empty", "gradual"];
        const index = types.indexOf(type);
        if (index !== -1) {
            this.idType = index + 1;
        }
        else {
            console.log("idType is not correct");
            this.idType = 1;
        }
    }
    fileExist(path = this.path_db) {
        try {
            if (fs.existsSync(path)) {
                // console.log("The db exists.");
                return true;
            }
            else {
                // console.log('The db does not exist.');
                // console.log("Don't worry i will create empty db");
                try {
                    fs.writeFileSync(path, "[]");
                    return true;
                }
                catch (error) {
                    let folder = path.split("/");
                    folder.pop();
                    fs.mkdirSync(folder.join("/"));
                    fs.writeFileSync(path, "[]");
                    return true;
                }
            }
        }
        catch (err) {
            console.error(err);
            return false;
        }
    }
    ensureFile(callback) {
        if (fs.existsSync(this.path_db)) {
            return callback();
        }
        else {
            this.fileExist();
            if (fs.existsSync(this.path_db)) {
                return callback();
            }
            else {
                return "Not found db\nCreate new DB";
            }
        }
    }
    save(data) {
        data = JSON.stringify(data);
        this.ensureFile(() => {
            try {
                fs.writeFileSync(this.path_db, data, { encoding: "utf-8" });
                return true;
            }
            catch (error) {
                console.error(error);
                return false;
            }
        });
    }
    getAll() {
        return this.ensureFile(() => {
            let data = fs.readFileSync(this.path_db, { encoding: "utf-8" });
            return JSON.parse(data);
        });
    }
    push(data) {
        let all = this.getAll();
        let lastId = all.length ? all[all.length - 1]._id + 1 : 1;
        let db = all;
        let _id = undefined;
        if (this.idType === 1) {
            _id = shortid.generate();
        }
        else if (this.idType === 3)
            _id = lastId;
        data = Object.assign({ _id: _id }, data);
        db.push(data);
        this.save(db);
        return data;
    }
    find(data) {
        let db = this.getAll();
        let result = lodash.find(db, data);
        if (!result)
            return {};
        // let newResult = new raniObj();
        // for (let item in result) {
        //   newResult[item] = result[item];
        // }
        // newResult.filter.that = this.filter(result);
        // newResult.filter.that.db.that = this;
        return result;
    }
    findIndex(data) {
        let db = this.getAll();
        return lodash.findIndex(db, data);
    }
    filter(data) {
        let db = this.getAll();
        // let result = new raniArray();
        // result = raniArray.from(lodash.filter(db, data));
        // result.db.that = this;
        let result = lodash.filter(db, data);
        return result;
    }
    updata(find, data) {
        let db = this.getAll();
        let index = this.findIndex(find);
        db[index] = data;
        this.save(db);
        return data;
    }
    clear() {
        try {
            this.save([]);
            return true;
        }
        catch (error) {
            console.log(error);
            return false;
        }
    }
}
module.exports = Ranidb;
//# sourceMappingURL=index.js.map