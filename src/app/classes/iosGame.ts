export class IosGame {
    
    constructor(private _obj: any) {}

    get icon(): string {
        return this._obj.artworkUrl512;
    }

    get name(): string {
        return this._obj.trackName;
    }

    getAverageRating(): string {
        return this._obj.averageUserRating;
    }
    
}