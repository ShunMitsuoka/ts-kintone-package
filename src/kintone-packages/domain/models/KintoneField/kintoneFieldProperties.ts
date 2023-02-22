import { KintoneFieldPropertyOption } from "./kintoneFieldPropertyOption";
import { KintoneFieldType } from "./kintoneFieldType";
import { KintoneValue } from "../KintoneValue/kintoneValue";
import { ValueObject } from "../../interfaces/models/valueObject";


interface FieldPropertiesProps {
    label : string,
    type : KintoneFieldType,
    noLabel? : boolean,
    required? : boolean,
    unique? : boolean,
    options? : Map<number,KintoneFieldPropertyOption>,
    defaultValue? : KintoneValue,
}

export class KintoneFieldProperties implements ValueObject {

    readonly label : string;
    readonly type : KintoneFieldType;
    readonly noLabel? : boolean;
    readonly required? : boolean;
    readonly unique? : boolean;
    readonly options?: Map<number,KintoneFieldPropertyOption>;
    readonly defaultValue? : KintoneValue;

    public constructor({
            label,
            type,
            noLabel = false,
            required = false,
            unique = false,
            options,
            defaultValue,
    } : FieldPropertiesProps){
        this.label = label;
        this.type = type;
        this.noLabel = noLabel;
        this.required = required;
        this.unique = unique;
        this.options = options;
        this.defaultValue = defaultValue;
    }

    public getLabel() : string{
        return this.label;
    }

    public getType() : KintoneFieldType{
        return this.type;
    }
    public getTypeName() : string{
        return this.type.type;
    }

    public getDefaultValue() : any{
        if(this.defaultValue){
            return this.defaultValue.getValue();
        }else{
            return null
        }
    }

    public setOption(index:number, option : KintoneFieldPropertyOption ){
        if(this.options){
            this.options.set(index, option);
        }else{
            throw new Error("オプションが存在しない状態で、オプションは追加できません。");
        }
    }
}