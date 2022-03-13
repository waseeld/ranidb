import * as fs from 'fs-extra';

import * as shortid from 'shortid';

import * as lodash from 'lodash'
import { extend } from 'lodash';

type ty = "random" | "empty" | "gradual";

interface Options {
    idType: ty
}

// class raniObj extends Object {
//     filter() {
//       console.log(this.filter.that);
//     }
  
//     delete() {
//       return this.filter.that.delete();
//     }
  
//     updata(data) {
//       return this.filter.that.updata([data]);
//     }
  
//     put(data) {
//       return this.filter.that.put(data);
//     }
// }

// class raniArray extends Array {
//     db() {
//       return this.db.that;
//     }
  
//     delete() {
//       let db = this.db();
//       this.forEach((e) => {
//         let data = db.getAll();
  
//         data.splice(db.findIndex(e), 1);
  
//         db.save(data);
//       });
//       return db.getAll();
//     }
  
//     updata(data = []) {
//       let db = this.db();
//       let array = db.getAll();
  
//       this.forEach((e) => {
//         let newItem;
//         if (!Array.isArray(data)) {
//           newItem = data;
//         } else {
//           newItem = data[this.indexOf(e)];
//         }
//         let index = db.findIndex(e);
//         array[index] = newItem;
//       });
//       db.save(array);
//       return db.getAll();
//     }
  
//     put(data) {
//       let db = this.db();
  
//       let array = db.getAll();
  
//       this.forEach((e) => {
//         let index = db.findIndex(e);
//         let newItem;
//         if (!Array.isArray(data)) {
//           newItem = data;
//         } else {
//           newItem = data[this.indexOf(e)];
//         }
//         for (let key in newItem) {
//           e[key] = newItem[key];
//         }
//         array[index] = e;
//       });
//       db.save(array);
  
//       return db.getAll();
//     }
// }

class Ranidb {
    idType: any;
    path_db: string;
    constructor(path_db: string, Options: Options = { idType: "random" }) {
        this.path_db = path_db;
        this.setType(Options.idType);
        this.fileExist();
    }

    setType(type: ty) {
        const types: string[] = ["random", "empty", "gradual"];
        const index: any = types.indexOf(type);
        if (index !== -1) {
            this.idType = index + 1;
        } else {
            console.log("idType is not correct");
            this.idType = 1;
        }
    }

    fileExist(path = this.path_db) {
        try {
            if (fs.existsSync(path)) {
                // console.log("The db exists.");
                return true;
            } else {
                // console.log('The db does not exist.');
                // console.log("Don't worry i will create empty db");
                try {
                    fs.writeFileSync(path, "[]");
                    return true;
                } catch (error) {
                    let folder = path.split("/");
                    folder.pop();
                    fs.mkdirSync(folder.join("/"));
                    fs.writeFileSync(path, "[]");
                    return true;
                }
            }
        } catch (err) {
            console.error(err);
            return false;
        }
    }

    ensureFile(callback: Function) {
        if (fs.existsSync(this.path_db)) {
            return callback();
        } else {
            this.fileExist();
            if (fs.existsSync(this.path_db)) {
                return callback();
            } else {
                return "Not found db\nCreate new DB";
            }
        }
    }

    save(data: Array<any>): Boolean {
        let data_txt: string = JSON.stringify(data);
        this.ensureFile(() => {
            try {
                fs.writeFileSync(this.path_db, data_txt, { encoding: "utf-8" });
                return true;
            } catch (error) {
                console.error(error);
                return false;
            }
        });

        return this.getAll() == data ? true : false
    }

    getAll<T = unknown>(): Array<T> {
        return this.ensureFile(() => {
            let data = fs.readFileSync(this.path_db, { encoding: "utf-8" });
            return JSON.parse(data);
        });
    }

    push<T extends object>(data: T): T & {_id?: string} {
        let all: any = this.getAll();

        let lastId = all.length ? all[all.length - 1]._id + 1 : 1;

        let db: Array<object> = all;

        let _id: any = undefined;

        if (this.idType === 1) {
            _id = shortid.generate();
        } else if (this.idType === 3) _id = lastId;

        if (_id != undefined) {
            data = {
                ...data,
            };
        }else{
            data = {
                _id: _id,
                ...data,
            };
        }

        db.push(data);
        this.save(db);
        return data;
    }
    
    find<T extends object>(data: object | number | Function): T | Array<T> | undefined{    
        let db = this.getAll();
    
        let result = lodash.find(db, data) as T | undefined;
    
        if (!result) return;
    
        // let newResult = new raniObj();
    
        // for (let item in result) {
        //   newResult[item] = result[item];
        // }
        // newResult.filter.that = this.filter(result);
    
        // newResult.filter.that.db.that = this;
        
        if(typeof result === "object" || Array.isArray(result)) {
            return result;
        }
    }

    findIndex(data: object): Number {
        let db = this.getAll();
        return lodash.findIndex(db, data);
    }

    filter<T = unknown>(data: object): T[] {
        let db = this.getAll();
        
        // let result = new raniArray();
    
        // result = raniArray.from(lodash.filter(db, data));
    
        // result.db.that = this;

        let result = lodash.filter(db, data) as T[];

        return result;
    }

    updata<T extends object>(find: object, data: T): T {
        // TODO: Add check _id
        let db = this.getAll();
        let index: any = this.findIndex(find);
        db[index] = data;
        this.save(db);
        return data;
    }

    clear(): boolean {
        try {
          this.save([]);
          return true;
        } catch (error) {
          console.log(error);
          return false
        }
    }

    delete(data: any) : boolean {
        let AllData: Object[] = this.getAll()
        let keys = Object.keys(data)
        let removes = lodash.remove(AllData, (e: any) => {
            let logic: boolean[] = []
            for(let i = 0; i < keys.length; i++){
                let key: any = keys[i]
                let log = e[key] == data[key]
                logic.push(log)
            }

            return logic.every(e => e == true)
        })

        this.save(AllData)
        return removes.length > 0
    }
}

export = Ranidb;