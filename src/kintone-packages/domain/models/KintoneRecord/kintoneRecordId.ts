import { ValueObject } from "../../interfaces/models/valueObject";

export class KintoneRecordId implements ValueObject {
    readonly id : string;

    public constructor(id : string){
        this.id = id;
    }
}