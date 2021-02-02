# Ranidb

> A simple "database" that use JSON file for Node.JS.

## Installation
Add `ranidb` to your existing Node.js project.

with npm :
```bash
npm i ranidb
```
or with yarn:
```bash
yarn add ranidb
```

## example :

1- ``` getAll && insert ``` :
```javascript
const ranidb = require('ranidb');

let db = new ranidb("./db/data.json");

db.getAll();
/* Output :
[
    // all data in DB
]
*/

db.insert({msg:"Hello World"})

/* Output :
    {"_id":"W_Ddwtu1A", msg:"Hello World"}
*/

```

2- ``` find && filter ```
in data.json

```
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
```

```javascript
db.find({_id:"rqACSWx6kA"})

/* Output :
    {"_id": "rqACSWx6kA","user": "fred","age": 40,"active": false}
*/

db.find({_id:"rqACSWx6kA", age: 40})

/* Output :
    {"_id": "rqACSWx6kA","user": "fred","age": 40,"active": false}
*/

db.filter((user) => user.age > 12)

/* Output :
[
  { _id: 'Wtl9v2x-Q', user: 'barney', age: 36, active: true },
  { _id: 'rqACSWx6kA', user: 'fred', age: 40, active: false }
]
*/

db.filter((user) => user.active == true)

/* Output :
[
  { _id: 'Wtl9v2x-Q', user: 'barney', age: 36, active: true },
  { _id: 'DniDQHMNpo', user: 'pebbles', age: 1, active: true },
  { _id: 'SflmjJaVN', user: 'barney', age: 36, active: true },
  { _id: 'mL7Np2hr_Z', user: 'pebbles', age: 1, active: true }
]
*/
```