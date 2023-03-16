
import { KintoneFieldRepositoryInterface } from "../../domain/interfaces/repositories/kintoneFieldRepositoryInterface";
import { AppId } from "../../domain/models/KintoneApp/appId";
import { KintoneApp } from "../../domain/models/KintoneApp/kintoneApp";
import { KintoneField } from "../../domain/models/KintoneField/kintoneField";
import { KintoneFieldCode } from "../../domain/models/KintoneField/kintoneFieldCode";
import { KintoneFieldProperties } from "../../domain/models/KintoneField/kintoneFieldProperties";
import { KintoneRestFieldsApi } from "../externalapi/kintoneRestApi/kintoneRestFieldsApi";
import { KintoneFieldConverter } from "../services/kintoneFieldConverter";
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
                    result.set(property.code, 
                        new KintoneField(
                            new KintoneFieldCode(property.code), 
                            new KintoneFieldProperties({
                                label : property.label,
                                type : KintoneFieldConverter.makeFieldType(property),
                                noLabel : property.noLabel,
                                required : property.required,
                                unique : property.unique,
                                options : KintoneFieldConverter.makeOptions(property),
                                defaultValue : KintoneFieldConverter.makeDefaultValue(property),
                                lookUp : KintoneFieldConverter.makeLookUp(property),
                                referenceTable : KintoneFieldConverter.makeReferenceTable(property)
                            })
                        )
                    );
                }
            },
            (error) => {
                this.catchKintoneApiError(error);
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
                this.catchKintoneApiError(error);
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
                this.catchKintoneApiError(error);
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
                this.catchKintoneApiError(error);
            }
        );
        return result;
    }
    exist(appId: AppId): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}