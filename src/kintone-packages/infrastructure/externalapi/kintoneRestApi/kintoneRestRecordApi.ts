import { KintoneAppConst } from "@kintone-packages/domain/consts/kintoneAppConst";
import { AppId } from "@kintone-packages/domain/models/KintoneApp/appId";
import { KintoneField } from "@kintone-packages/domain/models/KintoneField/kintoneField";
import { KintoneRecord } from "@kintone-packages/domain/models/KintoneRecord/kintoneRecord";
import { KintoneRecordId } from "@kintone-packages/domain/models/KintoneRecord/kintoneRecordId";


export class KintoneRestRecordApi {

    // レコード一括取得で取得可能な上限数
    static readonly MAX_LIMIT_GET_RECORDS = KintoneAppConst.Record.MAX_LIMIT_GET;
    static readonly MAX_OFFSET_GET_RECORDS = KintoneAppConst.Record.MAX_OFFSET_GET;

    public getAll(appId: AppId, limit: number, offset: number, query: string) : Promise<any>{
        const MAX_LIMIT_GET_RECORDS = KintoneRestRecordApi.MAX_LIMIT_GET_RECORDS;
        limit = limit ? limit : MAX_LIMIT_GET_RECORDS;
        if(limit > MAX_LIMIT_GET_RECORDS){
            console.error('レコード一括取得のlimit上限を超えたレコード数を取得する事は出来ません。');
            limit = MAX_LIMIT_GET_RECORDS;
        }
        const MAX_OFFSET_GET_RECORDS = KintoneRestRecordApi.MAX_OFFSET_GET_RECORDS;
        offset = offset ? offset : 0;
        if(offset > MAX_OFFSET_GET_RECORDS){
            console.error('レコード一括取得のOffset上限を超えたレコード数を取得する事は出来ません。');
            offset = MAX_OFFSET_GET_RECORDS;
        }
        const params = {
            'app' : appId.id,
            'query' : query + ' limit '+limit+' offset '+offset,
            'totalCount' : true,
        };
        return kintone.api(
            kintone.api.url('/k/v1/records.json',true), // - pathOrUrl
            'GET',                                // - method
            params,                                // - params
        );
    }

    public create(appId: AppId, kintoneRecord: KintoneRecord) : Promise<any>{
        const record = {};
        kintoneRecord.getFields().forEach((field: KintoneField, key: string) => {
            if(field.valueExist()){
                record[key] = {
                    'value' : field.getValue()
                }
            }
        });
        const params = {
            "app": appId.id,
            "record": record,
        }
        return kintone.api(
            kintone.api.url('/k/v1/record.json',true), // - pathOrUrl
            'POST',                                // - method
            params,                                // - params
        )
    }
    
    public createAll(appId: AppId, kintoneRecords: KintoneRecord[]) : Promise<any>{
        const records:any = [];
        for (let index = 0; index < kintoneRecords.length; index++) {
            const kintoneRecord = kintoneRecords[index];
            const record = {};
            kintoneRecord.getFields().forEach((field: KintoneField, key: string) => {
                if(field.valueExist()){
                    record[key] = {
                        'value' : field.getValue()
                    }
                }
            });   
            records.push(record);
        }
        const params = {
            "app": appId.id,
            "records": records,
        }
        return kintone.api(
            kintone.api.url('/k/v1/records.json',true), // - pathOrUrl
            'POST',                                // - method
            params,                                // - params
        )
    }

    public update(appId: AppId, kintoneRecord: KintoneRecord) : Promise<any>{
        const record = {};
        kintoneRecord.getFields().forEach((field: KintoneField, key: string) => {
            if(field.valueExist()){
                record[key] = {
                    'value' : field.getValue()
                }
            }
        });
        const params = {
            "app": appId.id,
            "id" : kintoneRecord.getRecordId(),
            "record": record,
        }
        return kintone.api(
            kintone.api.url('/k/v1/record.json',true), // - pathOrUrl
            'PUT',                                // - method
            params,                                // - params
        )
    }

    public delete(appId: AppId, recordIds: KintoneRecordId[]){
        const params = {
            "app": appId.id,
            "ids" : recordIds.map((recordId) => {return recordId.id}),
        }
        return kintone.api(
            kintone.api.url('/k/v1/records.json',true), // - pathOrUrl
            'DELETE',                                // - method
            params,                                // - params
        )
    }
}