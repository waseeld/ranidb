class dbArray extends Array {
    delete() {
        this.forEach(
            e => {
                let data = this.db.getAll();

                data.splice(this.db.findIndex(e), 1);

                this.db.save(data);
            }
        )
        return this.db.getAll();
    }

    updata(data) {

        this.forEach(
            e => {

                let db = this.db.getAll();

                let index = this.db.findIndex(e);

                db[index] = data;

                this.db.save(db);

            }
        )
        return this.db.getAll();
    }

    put(data){
        this.forEach(
            e => {

                let db = this.db.getAll();

                let index = this.db.findIndex(e);

                for (let key in data){
                    db[index][key] = data[key];
                }

                this.db.save(db);

            }
        )

        return this.db.getAll();

    }
}

module.exports = dbArray;
