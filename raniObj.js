class raniObj extends Object {
  filter() {
    console.log(this.filter.that);
  }

  delete() {
    return this.filter.that.delete();
  }

  updata(data) {
    return this.filter.that.updata([data]);
  }

  put(data) {
    return this.filter.that.put(data);
  }
}

module.exports = raniObj;
