import { Entity } from "../../interfaces/models/entity";
import { KintoneField } from "../KintoneField/kintoneField";
import { KintoneFields } from "../KintoneFields/kintoneFields";
import { KintoneRecordId } from "./kintoneRecordId";


export class KintoneRecord implements Entity {
    private _recordId? : KintoneRecordId;
    private _fileds : KintoneFields;

    constructor(
        fileds:KintoneFields,
        recordId?:KintoneRecordId,
    ){
        this._recordId = recordId;
        this._fileds = fileds;
    }

    static getRecordIdFromRecord(record):KintoneRecordId{
        return new KintoneRecordId(record['$id'].value)
    }

    public getRecordId():string{
        if(!this._recordId){
            throw new Error("recordIdが設定されていません");
        }
        return this._recordId.id;
    }

    public existRecordId(){
        if(this._recordId && this._recordId.id && this._recordId.id != ''){
            return true;
        }
        return false;
    }

    public setRecordId(recordId:KintoneRecordId){
        this._recordId = recordId;
    }

    public getFields():Map<string, KintoneField>{
        return this._fileds.getFields();
    }

    public setValue(fieldCode: string, value: string | string[]){
        if(!this._fileds.hasFeldCode(fieldCode)){
            throw new Error("存在しないfiledCodeのフィールドに値を設定しようとして失敗しました。");
        }
        this._fileds.getFields().get(fieldCode)!.setValue(value);
    }

    public addValue(fieldCode: string, value: string){
        if(!this._fileds.hasFeldCode(fieldCode)){
            throw new Error("存在しないfiledCodeのフィールドに値を設定しようとして失敗しました。");
        }
        const targetField = this._fileds.getFields().get(fieldCode)!;
        if(!targetField.getFieldType().isArrayValueFieldType()){
            throw new Error("配列形式のフィールドタイプ以外では使用できません。");
        }
        if(!targetField.valueExist()){
            targetField.setValue(value);
            return
        }
        const valueArray = targetField.getValue() as string[];
        const newValue = valueArray.concat(value);
        targetField.setValue(newValue);
    }

    public getValue(fieldCode: string){
        if(this._fileds.getFields().has(fieldCode)){
            return this._fileds.getFields().get(fieldCode)!.getValue();   
        }else{
            throw new Error("存在しないfiledCodeの値を取得しようとして失敗しました。");
        }
    }
    public existValue(fieldCode: string) : boolean{
        if(this._fileds.getFields().has(fieldCode)){
            return this._fileds.getFields().get(fieldCode)!.valueExist();   
        }
        return false;
    }

    public clearValue(fieldCode: string){
        if(!this._fileds.hasFeldCode(fieldCode)){
            throw new Error("存在しないfiledCodeのフィールドの値をクリアしようとして失敗しました。");
        }
        this._fileds.getFields().get(fieldCode)!.clearValue();
    }

    public clearAllValues(){
        this._fileds.getFields().forEach((kintoneField, key) => {
            kintoneField.clearValue();
        });
    }
}