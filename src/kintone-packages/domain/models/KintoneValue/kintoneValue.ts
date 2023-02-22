import { ValueObject } from "../../interfaces/models/valueObject";

export abstract class KintoneValue implements ValueObject {
    protected value : any;

    public constructor(value : any){
        this.value = value;
    }

    abstract getValue() : string | string[];
    abstract isArray() : boolean;
}