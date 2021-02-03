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
## API
- <a href="#ranidb"><code><b>Ranidb()</b></code></a>
- <a href="#save"><code>db.<b>save()</b></code></a>
- <a href="#getAll"><code>db.<b>getAll()</b></code></a>
- <a href="#push"><code>db.<b>push()</b></code></a>
- <a href="#find"><code>db.<b>find()</b></code></a>
- <a href="#filter"><code>db.<b>filter()</b></code></a>

<a name="ranidb"></a>

### `Ranidb(path_db)`
The main entry point for creating a new `Ranidb` instance.

- `path_db` it must be string for path to file json, for example : `"./db/data.json"`

```js
let db = new ranidb("./db/data.json");
```

<a name="save"></a>

### `save(data)`
This function will delete all data and then rewrite it again.

- `path_db` it must be Array data.

```js
let db = new ranidb("./db/data.json");
let arr = [
{id: 1, name:"sami", age:21},
{id: 2, name:"was", age:19},
{id: 3, name:"ahmed", age:17}
];

db.save(arr)
```

## example :

1- ``` getAll && push ``` :
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
