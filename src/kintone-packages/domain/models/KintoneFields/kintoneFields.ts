import { Entity } from "../../interfaces/models/entity";
import { KintoneField } from "../KintoneField/kintoneField";

export class KintoneFields implements Entity {
    private fields : Map<string, KintoneField>;

    constructor(
        fields : Map<string, KintoneField>,
    ){
        this.fields = fields;
    }

    public getFields() : Map<string, KintoneField>
    {
        return this.fields;
    }

    public hasFeldCode(fieldCode: string) : boolean
    {
        return this.fields.has(fieldCode);
    }
}