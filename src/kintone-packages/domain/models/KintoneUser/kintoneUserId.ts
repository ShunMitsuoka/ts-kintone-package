import { ValueObject } from "@kintone-packages/domain/interfaces/models/valueObject";

export class KintoneUserId implements ValueObject {
    readonly id : string;

    public constructor(id : string){
        this.id = id;
    }
}