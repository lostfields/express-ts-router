export declare class Model<T extends Model<T>> {
    private ctor;
    constructor(ctor: {
        new (...args: any[]): T;
    });
    protected convert(source: Partial<T>, ...constructorArgs: any[]): T;
    protected static convert<T extends Model<T>>(source: Partial<T>, ...constructorArgs: any[]): T;
    protected static convert<T extends Model<T>>(source: Partial<T>, ctor: {
        new (...args: any[]): T;
    }, ...constructorArgs: any[]): T;
    assign(properties: Partial<T>, ...ignoreProperties: string[]): void;
    protected convertNumber(value: any, defaultValue?: number): number;
    private static isClass;
    private static apply;
    toJSON(): any;
}
