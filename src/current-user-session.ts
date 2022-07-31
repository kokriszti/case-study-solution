export class CurrentUserSession {


    constructor (private _userId: number,
                 private _productId: number
    ) { }

    get userId(): number {
        return this._userId;
    }

    set userId(value: number) {
        this._userId = value;
    }

    get productId(): number {
        return this._productId;
    }

    set productId(value: number) {
        this._productId = value;
    }
}
