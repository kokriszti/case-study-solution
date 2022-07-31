export class User {

    constructor (private _id: number,
                 private _name: string,
                 private _viewedProducts: number[],
                 private _purchasedProducts: number[]
    ) { }

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }
    get viewedProducts(): number[] {
        return this._viewedProducts;
    }

    set viewedProducts(value: number[]) {
        this._viewedProducts = value;
    }

    get purchasedProducts(): number[] {
        return this._purchasedProducts;
    }

    set purchasedProducts(value: number[]) {
        this._purchasedProducts = value;
    }
}
