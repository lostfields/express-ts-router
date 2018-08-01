import assert = require('assert');

import { Model } from './../model/model';

interface IUser {
    name: string
    age: number
    settings: Partial<Settings>
}

interface ISettings {
    externalNo: string
    paymentTime: number
}

class User extends Model<User> {
    private properties: Partial<IUser> = {}

    public constructor() {
        super(User)

    }

    public get name() {
        return this.properties.name
    }

    public set name(value) {
        this.properties.name = value
    }

    public get age() {
        return this.properties.age
    }

    public set age(value) {
        this.properties.age = value
    }

    public get settings() {
        if(this.properties.settings == null) 
            this.properties.settings = new Settings()

        return this.properties.settings;
    }

    public set settings(value) {
        this.properties.settings = value
    }
}

class Settings extends Model<Settings> {
    private properties: Partial<ISettings> = {}
    
    public constructor() {
        super(Settings)
    }

    public get externalNo() {
        return this.properties.externalNo
    }

    public set externalNo(value) {
        this.properties.externalNo = value
    }

    public get paymentTime() {
        return this.properties.paymentTime
    }

    public set paymentTime(value) {
        this.properties.paymentTime = value
    }
}

describe("When using Model", () => {

    beforeEach(() => {

    })

    it('should apply properties from anonymous object', () => {
        let user = new User()
        
        user.settings.externalNo = '1337'

        user.assign({
            name: 'Kalle Klovn',
            age: 37,
            settings: {
                paymentTime: 14
            }
        })

        assert.equal(user.name, 'Kalle Klovn')
        assert.equal(user.age, 37)
        assert.equal(user.settings.paymentTime, 14)
        assert.equal(user.settings.externalNo, '1337')
    })

    it('should apply properties from class', () => {
        let user = new User(),
            newData = new User()
        
        newData.name = 'Kalle Klovn'
        newData.age = 37
        newData.settings.paymentTime = 14

        user.settings.externalNo = '1337'

        user.assign(newData)

        assert.equal(user.name, 'Kalle Klovn')
        assert.equal(user.age, 37)
        assert.equal(user.settings.paymentTime, 14)
        assert.equal(user.settings.externalNo, '1337')
    })

    

})