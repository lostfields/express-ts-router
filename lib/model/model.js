"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Model {
    constructor(ctor) {
        this.ctor = ctor;
    }
    convert(source, ...constructorArgs) {
        return Model.convert(source, this.ctor, ...constructorArgs);
    }
    static convert(source, ctor, ...constructorArgs) {
        if (Model.isClass(ctor) == false)
            throw new Error('Missing ctor of class T');
        if (source instanceof ctor)
            return source;
        let dest = new ctor(...constructorArgs);
        dest.assign(source);
        return dest;
    }
    assign(properties, ...ignoreProperties) {
        if (typeof properties !== 'object' || properties == null)
            return;
        Model.apply(this, properties, ...ignoreProperties);
    }
    convertNumber(value, defaultValue = 0.00) {
        return Number(value) || defaultValue;
    }
    static isClass(obj) {
        const isCtorClass = obj.constructor && obj.constructor.toString().substring(0, 5) === 'class';
        if (obj.prototype === undefined)
            return isCtorClass;
        const isPrototypeCtorClass = obj.prototype.constructor
            && obj.prototype.constructor.toString
            && obj.prototype.constructor.toString().substring(0, 5) === 'class';
        return isCtorClass || isPrototypeCtorClass;
    }
    static apply(target, source, ...ignoreProperties) {
        let targetProto = Object.getPrototypeOf(target), sourceProto = Model.isClass(source) == true ? Object.getPrototypeOf(source) : source;
        for (let property of Object.getOwnPropertyNames(sourceProto)) {
            if (source[property] === undefined || (ignoreProperties && ignoreProperties.indexOf(property) != -1))
                continue;
            // iterate through all properties of source
            if (targetProto.hasOwnProperty(property)) {
                let descriptor = Object.getOwnPropertyDescriptor(targetProto, property), value = descriptor.value;
                if (descriptor.get)
                    value = descriptor.get.call(target);
                if (value !== undefined && value !== null) {
                    switch (value.constructor) {
                        case Function:
                            break;
                        case Array:
                        case Date:
                        case Boolean:
                        case Number:
                        case String:
                            descriptor.set.call(target, source[property]);
                            break;
                        case Object:
                        default:
                            if (typeof source[property] == 'object') {
                                descriptor.set.call(target, this.apply(value, source[property]));
                            }
                            else {
                                descriptor.set.call(target, source[property]);
                            }
                            break;
                    }
                    continue;
                }
                descriptor.set.call(target, source[property]);
            }
        }
        return target;
    }
    // private static applyIf<U extends Object>(target: U, source: U, ...alwaysOverwrite: string[]): U {
    //     for (let property of Object.getOwnPropertyNames(source)) {
    //         if (targetProto.hasOwnProperty(property)) {
    //         if (source.hasOwnProperty(property)) {
    //             if (target[property] == null || alwaysOverwrite.indexOf(property) != -1)
    //                 target[property] = source[property];
    //         }
    //     }
    //     return target;
    // }
    toJSON() {
        let proto = Object.getPrototypeOf(this), json = {};
        for (let property of Object.getOwnPropertyNames(proto)) {
            if (proto.hasOwnProperty(property)) {
                let descriptor = Object.getOwnPropertyDescriptor(proto, property);
                if (descriptor.get) {
                    json[property] = descriptor.get.call(this);
                }
            }
        }
        return json;
    }
}
exports.Model = Model;
//# sourceMappingURL=model.js.map