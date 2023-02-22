import { AppId } from "@kintone-packages/domain/models/KintoneApp/appId";
import { KintoneApp } from "@kintone-packages/domain/models/KintoneApp/kintoneApp";
import { KintoneField } from "@kintone-packages/domain/models/KintoneField/kintoneField";
import { KintoneFieldPropertyOption } from "@kintone-packages/domain/models/KintoneField/kintoneFieldPropertyOption";


export class KintoneRestFieldsApi {
    public create(app : KintoneApp) : Promise<any>{
        const properties = {};

        const fields: Map<string, KintoneField> = app.getFieldsMap();
        fields.forEach((field: KintoneField, key: string) => {
            const options = {};
            const appOptions = field.getFieldProperties().options;
            if(appOptions && appOptions.size > 0){
                appOptions.forEach((appOption: KintoneFieldPropertyOption, optionKey: number) => {
                    options[appOption.label] = {
                        "label": appOption.label,
                        "index": appOption.index
                    }
                });
            }
            properties[field.getFieldCode()] = {
                "type": field.getFieldProperties().type.type,
                "code": field.getFieldCode(),
                "label": field.getFieldProperties().label,
                "noLabel": field.getFieldProperties().noLabel,
                "required": field.getFieldProperties().required,
                "unique": field.getFieldProperties().unique,
                "options": options,
                "defaultValue": field.getFieldProperties().getDefaultValue(),
            }
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
            const options = {};
            const appOptions = field.getFieldProperties().options;
            if(appOptions && appOptions.size > 0){
                appOptions.forEach((appOption: KintoneFieldPropertyOption, optionKey: number) => {
                    options[appOption.label] = {
                        "label": appOption.label,
                        "index": appOption.index
                    }
                });
            }
            let targetFiledCode = field.getFieldCode();
            let newFieldCode = field.getFieldCode();
            if (updatedFieldCodeMap && updatedFieldCodeMap.has(newFieldCode)) {
                const oldFieldCode = updatedFieldCodeMap.get(newFieldCode)!;
                targetFiledCode = oldFieldCode;
            }
            properties[targetFiledCode] = {
                "type": field.getFieldProperties().type.type,
                "code": field.getFieldCode(),
                "label": field.getFieldProperties().label,
                "noLabel": field.getFieldProperties().noLabel,
                "required": field.getFieldProperties().required,
                "unique": field.getFieldProperties().unique,
                "options": options,
                "defaultValue": field.getFieldProperties().getDefaultValue(),
            }
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