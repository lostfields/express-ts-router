"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const model_1 = require("./../model/model");
class User extends model_1.Model {
    constructor() {
        super(User);
        this.properties = {};
    }
    get name() {
        return this.properties.name;
    }
    set name(value) {
        this.properties.name = value;
    }
    get age() {
        return this.properties.age;
    }
    set age(value) {
        this.properties.age = value;
    }
    get settings() {
        if (this.properties.settings == null)
            this.properties.settings = new Settings();
        return this.properties.settings;
    }
    set settings(value) {
        this.properties.settings = value;
    }
}
class Settings extends model_1.Model {
    constructor() {
        super(Settings);
        this.properties = {};
    }
    get externalNo() {
        return this.properties.externalNo;
    }
    set externalNo(value) {
        this.properties.externalNo = value;
    }
    get paymentTime() {
        return this.properties.paymentTime;
    }
    set paymentTime(value) {
        this.properties.paymentTime = value;
    }
}
describe("When using Model", () => {
    beforeEach(() => {
    });
    it('should apply properties from anonymous object', () => {
        let user = new User();
        user.settings.externalNo = '1337';
        user.assign({
            name: 'Kalle Klovn',
            age: 37,
            settings: {
                paymentTime: 14
            }
        });
        assert.equal(user.name, 'Kalle Klovn');
        assert.equal(user.age, 37);
        assert.equal(user.settings.paymentTime, 14);
        assert.equal(user.settings.externalNo, '1337');
    });
    it('should apply properties from class', () => {
        let user = new User(), newData = new User();
        newData.name = 'Kalle Klovn';
        newData.age = 37;
        newData.settings.paymentTime = 14;
        user.settings.externalNo = '1337';
        user.assign(newData);
        assert.equal(user.name, 'Kalle Klovn');
        assert.equal(user.age, 37);
        assert.equal(user.settings.paymentTime, 14);
        assert.equal(user.settings.externalNo, '1337');
    });
});
//# sourceMappingURL=model.js.map