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
[
    {msg:"Hello World"}
]
*/
```