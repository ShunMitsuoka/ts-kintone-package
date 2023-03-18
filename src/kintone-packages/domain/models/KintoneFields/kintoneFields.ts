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

    public getField(fieldCode: string) : KintoneField
    {
        if(this.fields.has(fieldCode)){
            return this.fields.get(fieldCode)!
        }
        throw new Error("The FieldCode does not exist in this Fields");
        
    }

    public hasFeldCode(fieldCode: string) : boolean
    {
        return this.fields.has(fieldCode);
    }
}