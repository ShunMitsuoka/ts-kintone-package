import { ValueObject } from "@kintone-packages/domain/interfaces/models/valueObject";

export class KintoneFieldCode implements ValueObject {
    readonly fieldCode : string;

    public constructor(fieldCode : string){
        this.fieldCode = fieldCode;
    }
}