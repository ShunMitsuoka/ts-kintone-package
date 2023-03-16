import { ValueObject } from "../../../interfaces/models/valueObject";
import { AppId } from "../../KintoneApp/appId";
import { KintoneFieldCode } from "../kintoneFieldCode";
import { KintoneFieldType } from "../kintoneFieldType";

export type FieldMapping = {
    field : KintoneFieldCode,
    relatedField : KintoneFieldCode,
}

export interface LookUpOptionProps {
    appId : AppId,
    relatedKeyField : KintoneFieldCode,
    relatedKeyFieldType? : KintoneFieldType,
    appCode? : string,
    fieldMappings : FieldMapping[],
    lookupPickerFields : KintoneFieldCode[],
    filterCond? : string,
    sort? : string,
}

export class LookUpOption implements ValueObject {

    readonly appId : AppId;
    readonly relatedKeyField : KintoneFieldCode;
    readonly relatedKeyFieldType? : KintoneFieldType;
    readonly appCode? : string;
    private fieldMappings : FieldMapping[];
    private lookupPickerFields : KintoneFieldCode[];
    private filterCond? : string;
    private sort? : string;

    constructor({
        appId,
        relatedKeyField,
        relatedKeyFieldType,
        appCode,
        fieldMappings = [],
        lookupPickerFields = [],
        filterCond,
        sort,
    } : LookUpOptionProps){
        this.appId = appId;
        this.relatedKeyField = relatedKeyField;
        this.relatedKeyFieldType = relatedKeyFieldType;
        this.appCode = appCode;
        this.fieldMappings = fieldMappings;
        this.lookupPickerFields = lookupPickerFields;
        this.filterCond = filterCond;
        this.sort = sort;
    }

    getFieldMappings() : FieldMapping[]{
        return this.fieldMappings;
    }

    getLookupPickerFields() : KintoneFieldCode[]{
        return this.lookupPickerFields;
    }

    getFilterCond() : string | undefined{
        return this.filterCond;
    }

    getSort() : string | undefined{
        return this.sort;
    }
}