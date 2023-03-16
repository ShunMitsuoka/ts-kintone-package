import { AppId } from "../../domain/models/KintoneApp/appId";
import { FieldMapping, LookUpOption } from "../../domain/models/KintoneField/FieldOptions/lookUpOption";
import { ReferenceTable } from "../../domain/models/KintoneField/FieldOptions/referenceTable";
import { KintoneFieldCode } from "../../domain/models/KintoneField/kintoneFieldCode";
import { KintoneFieldPropertyOption } from "../../domain/models/KintoneField/kintoneFieldPropertyOption";
import { KintoneFieldType } from "../../domain/models/KintoneField/kintoneFieldType";
import { KintoneArrayValue } from "../../domain/models/KintoneValue/kintoneArrayValue";
import { KintoneSingleValue } from "../../domain/models/KintoneValue/kintoneSingleValue";
import { KintoneValue } from "../../domain/models/KintoneValue/kintoneValue";

export class KintoneFieldConverter{


    /**
     * デフォルト値を作成
     * 文字列または配列
     * @param property 
     * @returns 
     */
    static makeDefaultValue(property : any) : KintoneValue | undefined{
        const fieldType = new KintoneFieldType(property.type);
        if (!property.defaultValue) {
            return undefined
        }
        return fieldType.isArrayValueFieldType() ? new KintoneArrayValue(property.defaultValue) : new KintoneSingleValue(property.defaultValue);
    }

    /**
     * 選択肢を作成
     * @param property 
     * @returns 
     */
    static makeOptions(property : any) : Map<number,KintoneFieldPropertyOption>{
        const options = new Map<number,KintoneFieldPropertyOption>();
        if(property.options){
            let index = 0;
            for (const key in property.options) {
                const option = property.options[key];
                options.set(index, new KintoneFieldPropertyOption(
                        key,
                        option.label,
                        option.index,
                    ));
                index++;
            }
        }
        return options;
    }

    /**
     * ルックアップを作成
     * @param property 
     * @returns 
     */
    static makeLookUp(property : any) : LookUpOption | undefined{
        if (!property.lookup) {
            return undefined
        }
        const lookup = property.lookup;
        const fieldMappings : FieldMapping[] = [];
        const lookupPickerFields : KintoneFieldCode[] = [];
        if (lookup.fieldMappings && lookup.fieldMappings.length > 0) {
            lookup.fieldMappings.map((fieldMapping, index) => {
                fieldMappings.push({ 
                    field : new KintoneFieldCode(fieldMapping.field), 
                    relatedField : new KintoneFieldCode(fieldMapping.relatedField) 
                })
            })
        }
        if (lookup.lookupPickerFields && lookup.lookupPickerFields.length > 0) {
            lookup.lookupPickerFields.map((lookupPickerField, index) => {
                lookupPickerFields.push(new KintoneFieldCode(lookupPickerField))
            })
        }
        return new LookUpOption({
            appId : new AppId(lookup.relatedApp.app),
            relatedKeyField : new KintoneFieldCode(lookup.relatedKeyField),
            appCode : lookup.relatedApp.code,
            fieldMappings : fieldMappings,
            lookupPickerFields : lookupPickerFields,
            filterCond : lookup.filterCond,
            sort : lookup.sort
        });
    }

    /**
     * 関連レコード一覧を作成
     * @param property 
     * @returns 
     */
    static makeReferenceTable(property : any) : ReferenceTable | undefined{
        if (!property.referenceTable) {
            return undefined
        }
        const referenceTable = property.referenceTable;
        const displayFields : KintoneFieldCode[] = [];
        if (referenceTable.displayFields && referenceTable.displayFields.length > 0) {
            referenceTable.displayFields.map((displayField) => {
                displayFields.push(new KintoneFieldCode(displayField))
            })
        }
        return new ReferenceTable({
            appId : new AppId(referenceTable.relatedApp.app),
            appCode : referenceTable.relatedApp.code,
            condition : {
                field : new KintoneFieldCode(referenceTable.condition.field),
                relatedField : new KintoneFieldCode(referenceTable.condition.relatedField)
            },
            filterCond : referenceTable.filterCond,
            displayFields : displayFields,
            sort : referenceTable.sort,
            size : referenceTable.size && Number(referenceTable.size),
        });
    }

}