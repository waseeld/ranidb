const fs = require("fs-extra");
const shortid = require("shortid");
let lodash = require("lodash");

class Ranidb {
  constructor(path_db, setting = { idType: "random" }) {
    this.path_db = path_db;
    this.setType(setting.idType);
    this.fileExist();
  }

  setType(type) {
    const types = ["random", "empty", "gradual"];
    const index = types.indexOf(type);
    if (index !== -1) {
      this.idType = index + 1;
    } else {
      console.log("idType is not correct");
      this.idType = 1;
    }
  }

  fileExist(path = this.path_db) {
    try {
      if (fs.existsSync(path)) {
        // console.log("The db exists.");
        return true;
      } else {
        // console.log('The db does not exist.');
        // console.log("Don't worry i will create empty db");
        try {
          fs.writeFileSync(path, "[]");
          return true;
        } catch (error) {
          let folder = path.split("/");
          folder.pop();
          fs.mkdirSync(folder.join("/"));
          fs.writeFileSync(path, "[]");
          return true;
        }
      }
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  ensureFile(callback) {
    if (fs.existsSync(this.path_db)) {
      return callback();
    } else {
      this.fileExist();
      if (fs.existsSync(this.path_db)) {
        return callback();
      } else {
        return "Not found db\nCreate new DB";
      }
    }
  }

  save(data) {
    data = JSON.stringify(data);
    this.ensureFile(() => {
      fs.writeFileSync(this.path_db, data, { encoding: "utf-8" }, (err) => {
        if (err) {
          return console.error(err);
        }
      });
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
    } else if (this.idType === 3) _id = lastId;

    data = {
      _id: _id,
      ...data,
    };

    db.push(data);
    this.save(db);
    return data;
  }
  find(data) {
    let raniObj = require("./raniObj");

    let db = this.getAll();

    let result = lodash.find(db, data);

    if (!result) return;

    let newResult = new raniObj();

    for (let item in result) {
      newResult[item] = result[item];
    }
    newResult.filter.that = this.filter(result);

    newResult.filter.that.db.that = this;

    return newResult;
  }
  findIndex(data) {
    let db = this.getAll();
    return lodash.findIndex(db, data);
  }

  filter(data) {
    let db = this.getAll();

    const raniArray = require("./raniArray");

    let result = new raniArray();

    result = raniArray.from(lodash.filter(db, data));

    result.db.that = this;

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
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Ranidb;
