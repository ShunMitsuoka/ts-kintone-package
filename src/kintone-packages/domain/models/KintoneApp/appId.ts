import { ValueObject } from "../../interfaces/models/valueObject";

export class AppId implements ValueObject {
    readonly id : number;

    public constructor(id : number){
        this.id = Number(id);
    }
}