import { AppId } from "../../../domain/models/KintoneApp/appId";
import { KintoneApp } from "../../../domain/models/KintoneApp/kintoneApp";
import { KintoneField } from "../../../domain/models/KintoneField/kintoneField";
import { KintoneRestFieldApiConverter } from "../../services/kintoneRestFieldApiConverter";


export class KintoneRestFieldsApi {
    public create(app : KintoneApp) : Promise<any>{
        const properties = {};
        const fields: Map<string, KintoneField> = app.getFieldsMap();
        fields.forEach((field: KintoneField, key: string) => {
            properties[field.getFieldCode()] = KintoneRestFieldApiConverter.makeProperties(field);
        });
        const params = {
            "app": app.getAppId().id,
            "properties": properties,
        }
        if(!app.getRevision()){
            params["revision"] = app.getRevision();
        }
        return kintone.api(
            kintone.api.url('/k/v1/preview/app/form/fields.json',true), // - pathOrUrl
            'POST',                                // - method
            params,                                // - params
        )
    }

    public async get(appId : AppId, preview:boolean = false) : Promise<any>{
        const params = {
            "app": appId.id,
        }
        const url = preview ? '/k/v1/preview/app/form/fields.json' : '/k/v1/app/form/fields.json';
        return kintone.api(
            kintone.api.url(url,true), // - pathOrUrl
            'GET',                                // - method
            params,                                // - params
        )
    }

    /**
     * 
     * @param app 
     * @param updatedFieldCodeMap フィールドコードを更新するためのkeyに新しいフィールドコード、値に既存のフィールドコードを設定したMap
     * @returns 
     */
    public update(app : KintoneApp, updatedFieldCodeMap? : Map<string, string>) : Promise<any>{
        const properties = {};
        const fields: Map<string, KintoneField> = app.getFieldsMap();
        fields.forEach((field: KintoneField, key: string) => {
            let targetFiledCode = field.getFieldCode();
            let newFieldCode = field.getFieldCode();
            if (updatedFieldCodeMap && updatedFieldCodeMap.has(newFieldCode)) {
                const oldFieldCode = updatedFieldCodeMap.get(newFieldCode)!;
                targetFiledCode = oldFieldCode;
            }
            properties[targetFiledCode] = KintoneRestFieldApiConverter.makeProperties(field);
        });
        const params = {
            "app": app.getAppId().id,
            "properties": properties,
        }
        if(!app.getRevision()){
            params["revision"] = app.getRevision();
        }
        return kintone.api(
            kintone.api.url('/k/v1/preview/app/form/fields.json',true), // - pathOrUrl
            'PUT',                                // - method
            params,                                // - params
        )
    }

    public delete(app : KintoneApp) : Promise<any>{
        const fields:string[] = [];

        app.getFieldsMap().forEach((kintoneField, key) => {
            fields.push(kintoneField.getFieldCode());
        });
        const params = {
            "app": app.getAppId().id,
            "fields": fields,
        }
        if(!app.getRevision()){
            params["revision"] = app.getRevision();
        }
        return kintone.api(
            kintone.api.url('/k/v1/preview/app/form/fields.json',true), // - pathOrUrl
            'DELETE',                                // - method
            params,                                // - params
        )
    }

}