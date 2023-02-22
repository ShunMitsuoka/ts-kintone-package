import { AppId } from "../../models/KintoneApp/appId";
import { KintoneApp } from "../../models/KintoneApp/kintoneApp";
import { KintoneField } from "../../models/KintoneField/kintoneField";

export interface KintoneFieldRepositoryInterface{
    getByFieldCode(appId : AppId) : Promise<KintoneField>;
    getAll(appId : AppId) : Promise<Map<string, KintoneField>>;
    create(app : KintoneApp) : Promise<boolean>;
    update(app : KintoneApp, newAndOldFieldCodes : Map<string, string>) : Promise<boolean>;
    delete(app : KintoneApp) : Promise<boolean>;
    exist(appId : AppId) : Promise<boolean>;
} 