export class Model<T extends Model<T>>  {
    constructor(private ctor: { new (...args: any[]): T }) {

    }

    protected convert(source: Partial<T>, ...constructorArgs: any[]): T {
        return Model.convert<T>(source, this.ctor, ...constructorArgs);
    }

    protected static convert<T extends Model<T>>(source: Partial<T>, ...constructorArgs: any[]): T
    protected static convert<T extends Model<T>>(source: Partial<T>, ctor: { new(...args: any[]): T }, ...constructorArgs: any[]): T
    protected static convert<T extends Model<T>>(source: Partial<T>, ctor: { new (...args: any[]): T }, ...constructorArgs: any[]): T {
        if (Model.isClass(ctor) == false)
            throw new Error('Missing ctor of class T');

        if (source instanceof ctor)
            return <T>source;

        let dest = new ctor(...constructorArgs)
         
        dest.assign(source);
        
        return dest;
    }

    public assign(properties: Partial<T>, ...ignoreProperties: string[]): void {
        if(typeof properties !== 'object' || properties == null)
            return

        Model.apply(<Object>this, properties, ...ignoreProperties)
    }
    
    protected convertNumber(value: any, defaultValue: number = 0.00): number {
        return  Number(value) || defaultValue
    }

    private static isClass(obj: any) {
        const isCtorClass = obj.constructor && obj.constructor.toString().substring(0, 5) === 'class';

        if (obj.prototype === undefined)
            return isCtorClass
        
        const isPrototypeCtorClass = obj.prototype.constructor
            && obj.prototype.constructor.toString
            && obj.prototype.constructor.toString().substring(0, 5) === 'class'

        return isCtorClass || isPrototypeCtorClass
    }

    private static apply<U extends Object>(target: U, source: U, ...ignoreProperties: string[]): U {
        let targetProto: Object = Object.getPrototypeOf(target),
            sourceProto: Object = Model.isClass(source) == true ? Object.getPrototypeOf(source) : source
            
        for (let property of Object.getOwnPropertyNames(sourceProto)) {
            if(source[property] === undefined || (ignoreProperties && ignoreProperties.indexOf(property) != -1))
                continue

            // iterate through all properties of source
            if (targetProto.hasOwnProperty(property)) {
                let descriptor = Object.getOwnPropertyDescriptor(targetProto, property),
                    value = descriptor.value

                if(descriptor.get)
                    value = descriptor.get.call(target)

                switch(typeof value) {
                    case 'object':
                        if(descriptor.value instanceof Date == false) {
                            if(descriptor.set) 
                                descriptor.set.call(target, Model.apply(value, source[property]))

                            break;
                        }
                        
                    default:
                        if (descriptor.set /*&& descriptor.get.call(this) == undefined*/) {
                            // property of destination is writable
                            descriptor.set.call(target, source[property]);
                        }
                }
            }
        }

        return target
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


    public toJSON(): any {
        let proto: Object = Object.getPrototypeOf(this),
            json: Object = {};

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