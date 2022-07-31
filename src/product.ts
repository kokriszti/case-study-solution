export class Product {

    private _keywords: string [] = []

    constructor (private _id: number,
                 private _name: string,
                 private _year: number,
                 private _keyword1: string,
                 private _keyword2: string,
                 private _keyword3: string,
                 private _keyword4: string,
                 private _keyword5: string,
                 private _rating: number,
                 private _price: number,
                 ) {
        if (_keyword1 !== "") this._keywords.push(_keyword1)
        if (_keyword2 !== "") this._keywords.push(_keyword2)
        if (_keyword3 !== "") this._keywords.push(_keyword3)
        if (_keyword4 !== "") this._keywords.push(_keyword4)
        if (_keyword5 !== "") this._keywords.push(_keyword5)

    }

    public get id(): number {
        return this._id;
    }
    public get name(): string {
        return this._name;
    }
    public get year(): number {
        return this._year;
    }
    public get keyword1(): string {
        return this._keyword1;
    }
    public get keyword2(): string {
        return this._keyword2;
    }
    public get keyword3(): string {
        return this._keyword3;
    }
    public get keyword4(): string {
        return this._keyword4;
    }
    public get keyword5(): string {
        return this._keyword5;
    }
    public get rating(): number {
        return this._rating;
    }
    public get price(): number {
        return this._price;
    }
    set id(value: number) {
        this._id = value;
    }

    set name(value: string) {
        this._name = value;
    }

    set year(value: number) {
        this._year = value;
    }

    set keyword1(value: string) {
        this._keyword1 = value;
    }

    set keyword2(value: string) {
        this._keyword2 = value;
    }

    set keyword3(value: string) {
        this._keyword3 = value;
    }

    set keyword4(value: string) {
        this._keyword4 = value;
    }

    set keyword5(value: string) {
        this._keyword5 = value;
    }

    set rating(value: number) {
        this._rating = value;
    }

    set price(value: number) {
        this._price = value;
    }
    get keywords(): string[] {
        return this._keywords;
    }

    set keywords(value: string[]) {
        this._keywords = value;
    }
}
