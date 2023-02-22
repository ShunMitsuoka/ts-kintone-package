import { Entity } from "@kintone-packages/domain/interfaces/models/entity";
import { KintoneField } from "../KintoneField/kintoneField";
import { KintoneFields } from "../KintoneFields/kintoneFields";
import { AppId } from "./appId";
import {cloneDeep} from 'lodash';
import { KintoneDefaultFields } from "../KintoneFields/kintoneDefaultFields";
import { KintoneFieldCode } from "../KintoneField/kintoneFieldCode";
import { KintoneRecordId } from "../KintoneRecord/kintoneRecordId";
import { KintoneRecord } from "../KintoneRecord/kintoneRecord";

export class KintoneApp implements Entity {
    
    private _appId? : AppId;
    readonly appName : string;
    readonly space? : number;
    readonly thread? : number;
    private revision? : number;
    private fields : KintoneFields;

    constructor(
        appId:AppId,
        name:string,
        space?:number,
        thread?:number,
    ){
        this._appId = appId ? appId : undefined;
        this.appName = name;
        this.space = space ? space : undefined;
        this.thread = thread ? thread : undefined;
        this.fields = new KintoneFields(new Map<string, KintoneField>());
    }
    public setAppId(appId:AppId){
        this._appId = appId;
    }
    public getAppId() : AppId{
        if(!this._appId){
            throw new Error("appIdが設定されていません");
        }
        return this._appId;
    }
    public setRevision(revision : number){
        this.revision = revision;
    }
    public getRevision() : number | undefined{
        return this.revision;
    }

    public isThisApp(targetAppId : AppId){
        if(!this._appId){
            throw new Error("appIdが設定されていません");
        }
        return this._appId.id == targetAppId.id;
    }

    /**
     * フィールド関連
     */
    public setFields(fields : KintoneFields){
        this.fields = fields;
    }
    public concatFields(addFields : KintoneFields){
        addFields.getFields().forEach((kintoneField) => {
            this.fields.getFields().set(
                kintoneField.getFieldCode(),
                cloneDeep(kintoneField)
            );
        });
    }
    public getFields() : KintoneFields{
        return this.fields;
    }
    public getFieldsMap() : Map<string, KintoneField>{
        return this.fields.getFields();
    }
    public getCustomFields() : Map<string, KintoneField>{
        const fields:Map<string, KintoneField> = cloneDeep(this.fields.getFields());
        const defaultFields = KintoneDefaultFields.dafaultFields;
        defaultFields.forEach(defaultField => {
            let defaultFieldCode = defaultField.getFieldCode();
            fields.delete(defaultFieldCode);
        });
        return fields;
    }

    public existsFieldCode(fieldCode : KintoneFieldCode) : boolean{
        const fields = this.fields.getFields();
        return fields.has(fieldCode.fieldCode);
    }

    /**
     * レコード関連
     */
    public newRecord(recordId?: KintoneRecordId){
        let fileds = cloneDeep(this.getFields());
        return new KintoneRecord(fileds, recordId);
    }
}