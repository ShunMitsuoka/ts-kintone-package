import { AppId } from "@kintone-packages/domain/models/KintoneApp/appId";
import { KintoneApp } from "@kintone-packages/domain/models/KintoneApp/kintoneApp";
import { KintoneField } from "@kintone-packages/domain/models/KintoneField/kintoneField";

export interface KintoneFieldRepositoryInterface{
    getByFieldCode(appId : AppId) : Promise<KintoneField>;
    getAll(appId : AppId) : Promise<Map<string, KintoneField>>;
    create(app : KintoneApp) : Promise<boolean>;
    update(app : KintoneApp, newAndOldFieldCodes : Map<string, string>) : Promise<boolean>;
    delete(app : KintoneApp) : Promise<boolean>;
    exist(appId : AppId) : Promise<boolean>;
} 