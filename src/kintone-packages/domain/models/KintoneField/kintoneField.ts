import { Entity } from "@kintone-packages/domain/interfaces/models/entity";
import { KintoneFieldCode } from "./kintoneFieldCode";
import { KintoneFieldProperties } from "./kintoneFieldProperties";
import { KintoneFieldType } from "./kintoneFieldType";
import { KintoneValue } from "../KintoneValue/kintoneValue";
import { KintoneArrayValue } from "../KintoneValue/kintoneArrayValue";
import { KintoneSingleValue } from "../KintoneValue/kintoneSingleValue";


export class KintoneField implements Entity {
    readonly fieldCode : KintoneFieldCode;
    private properties : KintoneFieldProperties;
    private value : KintoneValue | undefined;

    constructor(
        fieldCode : KintoneFieldCode,
        properties : KintoneFieldProperties,
    ){
        this.fieldCode = fieldCode;
        this.properties = properties;
    }

    public getFieldCode() : string{
        return this.fieldCode.fieldCode;
    }

    public setValue(value : string | string[]){
        if(!this.properties.type){
            throw new Error("フィールドの値を設定する場合、フィールドタイプを設定してください。");
        }
        if(this.properties.type.isArrayValueFieldType()){
            this.value =  new KintoneArrayValue(value as string[]);
        }else{
            this.value =  new KintoneSingleValue(value as string);
        }
    }

    public clearValue(){
        this.value = undefined;
    }

    public setFieldProperties(properties : KintoneFieldProperties){
        this.properties = properties;
    }

    public getFieldProperties() : KintoneFieldProperties{
        return this.properties;
    }

    public getFieldType() : KintoneFieldType {
        return this.properties.getType();
    }

    public getValue() : string | string[]{
        if(!this.properties.type){
            throw new Error("フィールドの値を取得する場合、フィールドタイプを設定してください。");
        }
        if(!this.valueExist()){
            throw new Error("値が設定されていないフィールドから値を取得することは出来ません。");
        }
        return this.value!.getValue();
    }

    public valueExist(){
        if(!this.properties.type){
            throw new Error("フィールドの値の存在確認を行う場合、フィールドタイプを設定してください。");
        }
        if(this.value === undefined){
            return false;
        }
        return true;
    }
}