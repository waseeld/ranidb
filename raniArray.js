class raniArray extends Array {
  db() {
    return this.db.that;
  }

  delete() {
    let db = this.db();
    this.forEach((e) => {
      let data = db.getAll();

      data.splice(db.findIndex(e), 1);

      db.save(data);
    });
    return db.getAll();
  }

  updata(data = []) {
    let db = this.db();
    let array = db.getAll();

    this.forEach((e) => {
      let newItem;
      if (!Array.isArray(data)) {
        newItem = data;
      } else {
        newItem = data[this.indexOf(e)];
      }
      let index = db.findIndex(e);
      array[index] = newItem;
    });
    db.save(array);
    return db.getAll();
  }

  put(data) {
    let db = this.db();

    let array = db.getAll();

    this.forEach((e) => {
      let index = db.findIndex(e);
      let newItem;
      if (!Array.isArray(data)) {
        newItem = data;
      } else {
        newItem = data[this.indexOf(e)];
      }
      for (let key in newItem) {
        e[key] = newItem[key];
      }
      array[index] = e;
    });
    db.save(array);

    return db.getAll();
  }
}

module.exports = raniArray;
