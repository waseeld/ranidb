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
    save(data: any): void;
    getAll(): Array<object>;
    push(data: object): object;
    find(data: object): object;
    findIndex(data: object): Number;
    filter(data: object): object[];
    updata(find: object, data: object): object;
    clear(): boolean;
    delete(data: any): any;
}
export = Ranidb;
