const ranidb = require('./index');

let db = new ranidb("./db/data.json");


let data = [
    { 'user': 'barney', 'age': 36, 'active': true },
    { 'user': 'fred', 'age': 40, 'active': false },
    { 'user': 'pebbles', 'age': 1, 'active': true }
]

// data.forEach(user => {
//     db.push(user)
// })

/*
[
    {
        "_id": "Wtl9v2x-Q",
        "user": "barney",
        "age": 36,
        "active": true
    },
    {
        "_id": "rqACSWx6kA",
        "user": "fred",
        "age": 40,
        "active": false
    },
    {
        "_id": "DniDQHMNpo",
        "user": "pebbles",
        "age": 1,
        "active": true
    }
]
*/
console.log(db.getAll());

console.log(db.find({_id:"JfMOsuESH"}));

console.log(db.filter((user) => user.active == true))