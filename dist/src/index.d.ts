declare type ty = "random" | "empty" | "gradual";
interface Options {
    idType: ty;
}
declare class Ranidb {
    idType: any;
    path_db: string;
    constructor(path_db: string, Options?: Options);
    setType(type: ty): void;
    fileExist(path?: string): boolean;
    ensureFile(callback: Function): any;
    save(data: Array<any>): Boolean;
    getAll<T = unknown>(): Array<T>;
    push<T extends object>(data: T): T & {
        _id?: string;
    };
    find<T extends object>(data: object | number | Function): T | Array<T> | undefined;
    findIndex(data: object): Number;
    filter<T = unknown>(data: object): T[];
    updata<T extends object>(find: object, data: T): T;
    clear(): boolean;
    delete(data: any): boolean;
}
export = Ranidb;
