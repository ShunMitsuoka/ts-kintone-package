import { ValueObject } from "@kintone-packages/domain/interfaces/models/valueObject";

export class PluginId implements ValueObject {
    readonly id : string;
    public constructor(id : string){
        this.id = id;
    }
}