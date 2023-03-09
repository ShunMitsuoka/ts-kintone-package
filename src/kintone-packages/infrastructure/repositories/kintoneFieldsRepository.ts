
import { KintoneFieldRepositoryInterface } from "../../domain/interfaces/repositories/kintoneFieldRepositoryInterface";
import { AppId } from "../../domain/models/KintoneApp/appId";
import { KintoneApp } from "../../domain/models/KintoneApp/kintoneApp";
import { KintoneField } from "../../domain/models/KintoneField/kintoneField";
import { KintoneFieldCode } from "../../domain/models/KintoneField/kintoneFieldCode";
import { KintoneFieldProperties } from "../../domain/models/KintoneField/kintoneFieldProperties";
import { KintoneFieldPropertyOption } from "../../domain/models/KintoneField/kintoneFieldPropertyOption";
import { KintoneFieldType } from "../../domain/models/KintoneField/kintoneFieldType";
import { KintoneArrayValue } from "../../domain/models/KintoneValue/kintoneArrayValue";
import { KintoneSingleValue } from "../../domain/models/KintoneValue/kintoneSingleValue";
import { KintoneRestFieldsApi } from "../externalapi/kintoneRestApi/kintoneRestFieldsApi";
import { BaseKintoneRepository } from "./baseKintoneRepository";

export class KintoneFieldsRepository extends BaseKintoneRepository  implements KintoneFieldRepositoryInterface{

    private kintoneRestFieldsApi : KintoneRestFieldsApi;
    
    public constructor(){
        super();
        this.kintoneRestFieldsApi = new KintoneRestFieldsApi();
    }
    
    getByFieldCode(appId: AppId): Promise<KintoneField> {
        throw new Error("Method not implemented.");
    }
    async getAll(appId: AppId, preview : boolean = false): Promise<Map<string, KintoneField>> {
        let result: Map<string, KintoneField> = new Map<string, KintoneField>();
        await this.kintoneRestFieldsApi.get(appId, preview).then(
            (resp) => {
                const properties = resp.properties;
                for (const key in properties) {
                    const property = properties[key];
                    const options = new Map<number,KintoneFieldPropertyOption>();
                    if(property.options){
                        let j = 0;
                        for (const key in property.options) {
                            const option = property.options[key];
                            options.set(j, new KintoneFieldPropertyOption(
                                    key,
                                    option.label,
                                    option.index,
                                ));
                            j++;
                        }
                    }
                    const fieldType = new KintoneFieldType(property.type);
                    result.set(property.code, 
                        new KintoneField(
                            new KintoneFieldCode(property.code), 
                            new KintoneFieldProperties({
                                label : property.label,
                                type : fieldType,
                                noLabel : property.noLabel,
                                required : property.required,
                                unique : property.unique,
                                options : options,
                                defaultValue : property.defaultValue ? 
                                    (fieldType.isArrayValueFieldType() ? new KintoneArrayValue(property.defaultValue) : new KintoneSingleValue(property.defaultValue)) 
                                    : undefined
                                ,
                            })
                        )
                    );
                }
            },
            (error) => {
                this.catchKintoneApiError(error, 'FAILED_TO_GET_ALL_FIELDS');
            }
        );
        return result;
    }
    async create(app: KintoneApp): Promise<boolean> {
        let result = false;
        let res = await this.kintoneRestFieldsApi.create(app).then(
            (resp) => {
                result = true;
            },
            (error) => {
                this.catchKintoneApiError(error, 'FAILED_TO_CRAETE_FIELD');
            }
        );
        return result;
    }
    async update(app: KintoneApp, newAndOldFieldCodes : Map<string, string>): Promise<boolean> {
        let result = false;
        await this.kintoneRestFieldsApi.update(app, newAndOldFieldCodes).then(
            (resp) => {
                result = true;
            },
            (error) => {
                this.catchKintoneApiError(error, 'FAILED_TO_UPDATE_FIELD');
            }
        );
        return result;
    }
    async delete(app: KintoneApp): Promise<boolean> {
        let result = false;
        await this.kintoneRestFieldsApi.delete(app).then(
            (resp) => {
                result = true;
            },
            (error) => {
                this.catchKintoneApiError(error, 'FAILED_TO_DELETE_FIELD');
            }
        );
        return result;
    }
    exist(appId: AppId): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}