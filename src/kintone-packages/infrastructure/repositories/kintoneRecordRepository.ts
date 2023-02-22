
import {chunk} from 'lodash';
import { KintoneRecordRepositoryInterface } from '../../domain/interfaces/repositories/kintoneRecordRepositoryInterface';
import { AppId } from '../../domain/models/KintoneApp/appId';
import { KintoneField } from '../../domain/models/KintoneField/kintoneField';
import { KintoneFieldCode } from '../../domain/models/KintoneField/kintoneFieldCode';
import { KintoneFieldProperties } from '../../domain/models/KintoneField/kintoneFieldProperties';
import { KintoneFieldType } from '../../domain/models/KintoneField/kintoneFieldType';
import { KintoneFields } from '../../domain/models/KintoneFields/kintoneFields';
import { KintoneRecord } from '../../domain/models/KintoneRecord/kintoneRecord';
import { KintoneRecordId } from '../../domain/models/KintoneRecord/kintoneRecordId';
import { KintoneRestRecordApi } from '../externalapi/kintoneRestApi/kintoneRestRecordApi';
import { BaseKintoneRepository } from './baseKintoneRepository';


export class KintoneRecordRepository extends BaseKintoneRepository implements KintoneRecordRepositoryInterface{
    private kintoneRestRecordApi : KintoneRestRecordApi;

    public constructor(){
        super();
        this.kintoneRestRecordApi = new KintoneRestRecordApi();
    }

    async getAll(appId: AppId, query: string, result?: KintoneRecord[], _params?: any) : Promise<KintoneRecord[]>{
        const offset = (_params && _params.offset) || 0;
        const limit = (_params && _params.limit) || null;
        let kintoneRecords:KintoneRecord[] = [];
        await this.kintoneRestRecordApi.getAll(appId, limit, offset, query)
        .then(
            (resp) => {
                const records = resp.records;
                for (let i = 0; i < records.length; i++) {
                    const record = records[i];
                    let fields = new Map<string, KintoneField>();
                    for (const fieldCode in record) {
                        if (Object.prototype.hasOwnProperty.call(record, fieldCode)) {
                            const recordData = record[fieldCode];
                            const type = recordData.type;
                            const value = recordData.value;
                            const fieldType = new KintoneFieldType(type)
                            const kintoneField = new KintoneField(
                                new KintoneFieldCode(fieldCode),
                                new KintoneFieldProperties({
                                    label: 'fieldCode',
                                    type : fieldType
                                })
                            )
                            kintoneField.setValue(value);
                            fields.set(fieldCode, kintoneField);
                        }
                    }
                    const recordId = KintoneRecord.getRecordIdFromRecord(record);
                    kintoneRecords.push(
                        new KintoneRecord(new KintoneFields(fields), recordId)
                    );
                }
            },
            (error) => {
                this.catchKintoneApiError(error, 'FAILED_TO_GET_ALL_RECORD');
            }
        );
        result = result || [];
        Array.prototype.push.apply(result, kintoneRecords);
        if(kintoneRecords.length === limit){
            _params.offset = offset + kintoneRecords.length;
            return await this.getAll(appId, query, result, _params);
        }else{
            return result;
        }
    }

    async create(appId: AppId, record: KintoneRecord): Promise<boolean> {
        let response;
        await this.kintoneRestRecordApi.create(appId, record)
        .then((resp) => {
            response = resp;
        })
        .catch((error) => {
            this.catchKintoneApiError(error, 'FAILED_TO_CRAETE_RECORD');
        });
        record.setRecordId(new KintoneRecordId(response.id));
        return true;
    }
    async createAll(appId: AppId, records: KintoneRecord[]): Promise<boolean> {
        // 一度に登録可能なのは100件まで
        const recordsChunk = chunk( records, 100 );
        for (let index = 0; index < recordsChunk.length; index++) {
            const chuckRecord = recordsChunk[index];
            let response;
            await this.kintoneRestRecordApi.createAll(appId, records)
            .then((resp) => {
                response = resp;
            })
            .catch((error) => {
                this.catchKintoneApiError(error, 'FAILED_TO_CRAETE_RECORD');
            });
            const ids = response.ids;
            for (let j = 0; j < ids.length; j++) {
                const id = ids[j];
                chuckRecord[j].setRecordId(new KintoneRecordId(id));
            }
        }
        return true;
    }
    async update(appId: AppId, record: KintoneRecord): Promise<boolean> {
        let response;
        await this.kintoneRestRecordApi.update(appId, record)
        .then((resp) => {
            response = resp;
        })
        .catch((error) => {
            this.catchKintoneApiError(error, 'FAILED_TO_UPDATE_RECORD');
        });
        return true;
    }
    
    async updateSingleField(appId: AppId, recordId: KintoneRecordId,  kintoneField: KintoneField, value : string | string[]): Promise<boolean> {
        let response;
        const fields = new Map<string, KintoneField>();
        kintoneField.setValue(value);
        fields.set(kintoneField.getFieldCode(), kintoneField);
        const record = new KintoneRecord(new KintoneFields(fields), recordId);
        await this.kintoneRestRecordApi.update(appId, record)
        .then((resp) => {
            response = resp;
        })
        .catch((error) => {
            this.catchKintoneApiError(error, 'FAILED_TO_UPDATE_RECORD');
        });
        return true;
    }

    async delete(appId: AppId, recordIds: KintoneRecordId[]): Promise<boolean> {
        let result = false;
        await this.kintoneRestRecordApi.delete(appId, recordIds)
        .then((resp) => {
                result = true;
        })
        .catch((error) => {
                this.catchKintoneApiError(error, 'FAILED_TO_DELETE_RECORD');
            }
        );
        return result;
    }
}