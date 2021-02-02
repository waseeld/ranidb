const ranidb = require('./index');

let db = new ranidb("./db/data.json");

console.log(db.getAll());

console.log(db.insert({msg:"fdfsdsf"}));