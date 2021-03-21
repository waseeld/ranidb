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


## Used with node

```js
const ranidb = require('ranidb');
```



## API

- <a href="#core"><code><b>Ranidb()</b></code></a>
- <a href="#save"><code>db.<b>save()</b></code></a>
- <a href="#getAll"><code>db.<b>getAll()</b></code></a>
- <a href="#push"><code>db.<b>push()</b></code></a>
- <a href="#find"><code>db.<b>find()</b></code></a>
- <a href="#filter"><code>db.<b>filter()</b></code></a>
- <a href="#findIndex"><code>db.<b>findIndex()</b></code></a>
- <a href="#map"><code>db.<b>map()</b></code></a>
- <a href="#updata"><code>db.<b>updata()</b></code></a>
- <a href="#Options"><code><b>Options</b></code></a>





<a name="core"></a>

### `Ranidb(path_db)`
The main entry point for creating a new `Ranidb` instance.

- `path_db` it must be string for path to file json, for example : `"./db/data.json"`

```js
let db = new ranidb("./db/data.json");
```

<a name="save"></a>

### `save(data)`
This function will delete all data and then rewrite it again.

- `data` it must be Array data.

```js
let db = new ranidb("./db/data.json");
let arr = [
{id: 1, name:"sami", age:21},
{id: 2, name:"was", age:19},
{id: 3, name:"ahmed", age:17}
];

db.save(arr)
```



<a name="getAll"></a>

### `getAll()`

This function will return data in file json.

```js
let db = new ranidb("./db/data.json");
db.getAll()

/* Output :
[
    // all data in DB (File json)
]
*/
```



<a name="push"></a>

### `push(data)`

This function will push data in file json.

- `data` it must be object data.

```js
let db = new ranidb("./db/data.json");
let data = {name:"ahmed", age:17};

db.push(data);
/* Output :
{
   {"_id": "R_Ddwtu1A", name:"ahmed", age:17}
}
*/
```



<a name="find"></a>

### `find(data)`

This function will data to need find.

- `data` it must be object data.

```js
let db = new ranidb("./db/data.json");

db.find({_id:"rqACSWx6kA"})

/* Output :
    {"_id": "rqACSWx6kA","user": "fred","age": 40,"active": false}
*/

db.find({_id:"rqACSWx6kA", age: 40})

/* Output :
    {"_id": "rqACSWx6kA","user": "fred","age": 40,"active": false}
*/
```



<a name="findIndex"></a>

### `findIndex(data)`

This function will find index for this data.

- `data` it must be object data.

```js
let db = new ranidb("./db/data.json");

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

db.findIndex({_id:"Wtl9v2x-Q"})

/* Output :
    0
*/

db.findIndex({_id:"rqACSWx6kA", age: 40})

/* Output :
    1
*/

// for not find
db.findIndex({_id:"rqACSWx6kA", age: 42})

/* Output :
    -1
*/
```





<a name="filter"></a>

### `filter(data)`

This function will data to need find.

- `data` it must be object data or function.

```js
let db = new ranidb("./db/data.json");

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



<a name="map"></a>

### `clear()`

This function will clear all data in ranidb.

```js
let db = new ranidb("./db/data.json");
/* in file json :
[
  { _id: 'Wtl9v2x-Q', user: 'barney', age: 36, active: true },
  { _id: 'DniDQHMNpo', user: 'pebbles', age: 1, active: true },
  { _id: 'SflmjJaVN', user: 'barney', age: 36, active: true },
  { _id: 'mL7Np2hr_Z', user: 'pebbles', age: 1, active: true }
]
*/
db.clear()
/* Output :
   []
*/
```



<a name="updata"></a>

### `updata(id, data)`

This function will data to need find.

- `id` it must be string.
- `data` it must be object.

```js
let db = new ranidb("./db/data.json");
/* in file json :
[
  { _id: 'Wtl9v2x-Q', user: 'barney', age: 36, active: true },
  { _id: 'DniDQHMNpo', user: 'pebbles', age: 1, active: true },
  { _id: 'SflmjJaVN', user: 'barney', age: 36, active: true },
  { _id: 'mL7Np2hr_Z', user: 'pebbles', age: 1, active: true }
]
*/

let data = {
    _id: 'Wtl9v2x-Q',
    user: 'barney',
    age: 42,
    active: true
}

db.updata("Wtl9v2x-Q", data)

/* Output :
   { _id: 'Wtl9v2x-Q', user: 'barney', age: 36, active: true }
*/
```

<a name="Options"></a>

### `Options`

now we're going to make changes to some of the virtual things

- `idType` it must be string.
    * random (default)
    ```js
    let db = new ranidb("./db/data.json" , {idType : 'random'} );
    /*
    is like let db = new ranidb("./db/data.json")
    */
    /* Output :
       { _id: 'Wtl9v2x-Q', ... }
    */
    ```

    * empty
    ```js
    let db = new ranidb("./db/data.json" , {idType : 'empty'} );
    /* Output :
       { ... }
    */
    ```
    
    * gradual
    ```js
    let db = new ranidb("./db/data.json" , {idType : 'gradual'} );
    /* Output :
       { _id: '1', ... },
       { _id: '2', ... },
       { _id: '3', ... },
       { _id: '4', ... },
       { _id: '5', ... }
    */
    ```
