import { ValueObject } from "../../interfaces/models/valueObject";

export class KintoneFieldPropertyOption implements ValueObject {
    readonly name:string;
    readonly label:string;
    readonly index:number;

    public constructor(
        name : string,
        label : string,
        index : number,
    ){
        this.name = name;
        this.label = label;
        this.index = index;
    }
}