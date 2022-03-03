"use strict";
const Ranidb = require("../dist/src/index");
var expect = require("chai").expect;
const fs = require("fs");
const db = new Ranidb("./db/data.json");
db.getAll();
let test = { "_id": "GT6DhK6KXb", "user": "test", "age": 15, "active": false };
describe("Functions", function () {
    it("getAll()", () => {
        let allData = db.getAll();
        let readAllData = fs.readFileSync("./db/data.json", { encoding: "utf-8" });
        readAllData = JSON.parse(readAllData);
        expect(allData.length).equal(readAllData.length);
    });
    it("push()", () => {
        let allDataPerv = db.getAll();
        db.push(test);
        let allDataNow = db.getAll();
        expect(allDataNow.length).greaterThan(allDataPerv.length);
    });
    it("find()", () => {
        let data = db.find(test);
        let allData = db.getAll();
        expect(data._id).equal(allData[2]._id);
    });
    it("fillter()", () => {
        let data = db.filter(test);
        expect(Object.keys(data[0]).length).equal(Object.keys(test).length);
    });
    it("updata()", () => {
        let data = db.find(test);
        data.ss = "asdsad";
        db.updata(test, data);
        let alldata = db.getAll();
        expect(alldata[2].ss).equal("asdsad");
    });
    it("clear()", () => {
        let clear = db.clear();
        let allDataNow = db.getAll();
        expect(clear == true && allDataNow.length == 0).equal(true);
    });
    it("delete()", () => {
        let startData = [
            {
                "_id": "JfMOsuESH",
                "user": "barney",
                "age": 36,
                "active": true
            },
            {
                "_id": "OHILvgy0ZD",
                "user": "fred",
                "age": 40,
                "active": false
            }
        ];
        db.save(startData);
        let clear = db.delete({ active: false });
        let allDataNow = db.getAll();
        console.log(allDataNow, clear);
        expect(allDataNow.length < startData.length).equal(true);
    });
    it("save()", () => {
        let startData = [
            {
                "_id": "JfMOsuESH",
                "user": "barney",
                "age": 36,
                "active": true
            },
            {
                "_id": "OHILvgy0ZD",
                "user": "fred",
                "age": 40,
                "active": false
            }
        ];
        db.save(startData);
        let allDataNow = db.getAll();
        expect(startData.length).equal(allDataNow.length);
    });
    // it("fillter().put()", () => {
    //     let dd = db.filter(test).put({ name: "salim", ...test });
    //     let allDataNow = db.getAll();
    //     expect(allDataNow[3].name).equal("salim");
    // });
    // it("fillter().updata()", () => {
    //     let data = db.find(test);
    //     db.filter(test).updata({ ...data, ss: "xzc" });
    //     let alldata = db.getAll();
    //     expect(alldata[3].ss).equal("xzc");
    // });
    // it("fillter().delete()", () => {
    //     let allDataPerv = db.getAll();
    //     db.filter(test).delete();
    //     let allDataNow = db.getAll();
    //     expect(allDataNow.length).lessThan(allDataPerv.length);
    // });
});
//# sourceMappingURL=index.test.js.map