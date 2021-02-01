const ranidb = require('../lib/ranidb');

let db = new ranidb("./db/data.json");

console.log(db.getAll());

db.insert({msg:"fdfsdsf"})
