import { AppId } from "@kintone-packages/domain/models/KintoneApp/appId";
import { KintoneField } from "@kintone-packages/domain/models/KintoneField/kintoneField";
import { KintoneRecord } from "@kintone-packages/domain/models/KintoneRecord/kintoneRecord";
import { KintoneRecordId } from "@kintone-packages/domain/models/KintoneRecord/kintoneRecordId";

export interface KintoneRecordRepositoryInterface{
    getAll(appId: AppId, query: string, result?: any[], _params?: any) : Promise<KintoneRecord[]>;
    create(appId: AppId, record : KintoneRecord) : Promise<boolean>;
    createAll(appId: AppId, records : KintoneRecord[]) : Promise<boolean>;
    update(appId: AppId, record : KintoneRecord) : Promise<boolean>;
    updateSingleField(appId: AppId, recordId: KintoneRecordId,  kintoneField: KintoneField, value : string | string[]): Promise<boolean> ;
    delete(appId: AppId, ecordId: KintoneRecordId[]) : Promise<boolean>;
} 