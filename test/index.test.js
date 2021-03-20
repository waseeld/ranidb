const { Ranidb } = require('../index');
var expect = require('chai').expect
const fs = require('fs');

let db = new Ranidb("./db/data.json");

let test = {
    "user": "test",
    "age": 15,
    "active": false
}

describe("Functions", function () {
    
    it("getAll()", () => {
        let allData = db.getAll()
        let readAllData = fs.readFileSync("./db/data.json", { encoding: "utf-8" });
        readAllData = JSON.parse(readAllData);

        expect(allData.length).equal(readAllData.length);
    })
    
    it("push()", () => {
        let allDataPerv = db.getAll()
        db.push(test)
        let allDataNow = db.getAll()
        expect(allDataNow.length).greaterThan(allDataPerv.length)
    })
        
    it("find()", () => {
        let data = db.find(test)
        expect(Object.keys(data).length).greaterThan(Object.keys(test).length)
    })

    it("fillter()", () => {
        let data = db.filter(test)
        expect(Object.keys(data[0]).length).greaterThan(Object.keys(test).length)
    })

    it("updata()", () => {
        let data = db.find(test)
        db.updata(test, {...data, ss:"asdsad"})
        let alldata = db.getAll();
        expect(alldata[3].ss).equal("asdsad")
    })

    it("fillter().put()", () => {
        let dd = db.filter(test).put({name:"salim", ...test})
        let allDataNow = db.getAll()
        expect(allDataNow[3].name).equal("salim")
    })

    it("fillter().updata()", () => {
        let data = db.find(test)
        db.filter(test).updata({...data, ss:"xzc"})
        let alldata = db.getAll();
        expect(alldata[3].ss).equal("xzc")
    })

    it("fillter().delete()", () => {
        let allDataPerv = db.getAll()
        db.filter(test).delete()
        let allDataNow = db.getAll()
        expect(allDataNow.length).lessThan(allDataPerv.length)
    })
});