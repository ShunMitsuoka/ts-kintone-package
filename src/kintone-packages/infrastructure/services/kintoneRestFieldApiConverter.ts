import { KintoneFieldTypeConst } from "../../domain/consts/kintoneFieldTypeConst";
import { KintoneField } from "../../domain/models/KintoneField/kintoneField";
import { KintoneFieldPropertyOption } from "../../domain/models/KintoneField/kintoneFieldPropertyOption";

export class KintoneRestFieldApiConverter{

    /**
     * 
     * @param field 
     * @returns 
     */
    static makeProperties(field: KintoneField) : any{
        return {
            "type": KintoneRestFieldApiConverter.makeType(field),
            "code": field.getFieldCode(),
            "label": field.getFieldProperties().label,
            "noLabel": field.getFieldProperties().noLabel,
            "required": field.getFieldProperties().required,
            "unique": field.getFieldProperties().unique,
            "options": KintoneRestFieldApiConverter.makeOptions(field),
            "defaultValue": field.getFieldProperties().getDefaultValue(),
            "lookup": KintoneRestFieldApiConverter.makeLookUp(field),
            "referenceTable" : KintoneRestFieldApiConverter.makeReferenceTable(field)
        }
    }

    /**
     * FiledTypeを作成
     * @param property 
     * @returns 
     */
    static makeType(field: KintoneField) : string{
        if(field.getFieldType().type == KintoneFieldTypeConst.LOOK_UP.type){
            if(field.getFieldProperties().lookUp == undefined || field.getFieldProperties().lookUp?.relatedKeyFieldType == undefined){
                throw new Error("LookUpフィールドを追加・更新する場合は、対処フィールドのフィールドタイプを設定する必要があります。");
            }
            const lookUp = field.getFieldProperties().lookUp!;
            return lookUp.relatedKeyFieldType!.type;
        }
        return field.getFieldProperties().type.type;
    }

    /**
     * 選択肢を作成
     * @param property 
     * @returns 
     */
    static makeOptions(field: KintoneField) : any{
        const result = {};
        const options = field.getFieldProperties().options;
        if (!options || options.size == 0) {
            return undefined;
        }
        options.forEach((appOption: KintoneFieldPropertyOption, optionKey: number) => {
            result[appOption.label] = {
                "label": appOption.label,
                "index": appOption.index
            }
        });
        return result;
    }

    /**
     * ルックアップを作成
     * @param property 
     * @returns 
     */
    static makeLookUp(field: KintoneField) : any{
        const lookUp = field.getFieldProperties().lookUp;
        if (!lookUp) {
            return undefined;
        }
        const fieldMappings : {field : string, relatedField : string}[] = [];
        const lookupPickerFields : string[] = [];
        lookUp.getFieldMappings().map((fieldMapping) => {
            fieldMappings.push({
                field : fieldMapping.field.fieldCode,
                relatedField : fieldMapping.relatedField.fieldCode,
            })
        });
        lookUp.getLookupPickerFields().map((lookupPickerField) => {
            lookupPickerFields.push(lookupPickerField.fieldCode);
        });
        return {
            relatedApp : {
                app : lookUp.appId.id,
                code : lookUp.appCode,
            },
            relatedKeyField : lookUp.relatedKeyField.fieldCode, 
            fieldMappings : fieldMappings,
            lookupPickerFields : lookupPickerFields,
            filterCond : lookUp.getFilterCond(),
            sort : lookUp.getSort(),
        };
    }

    /**
     * 関連レコード一覧を作成
     * @param property 
     * @returns 
     */
    static makeReferenceTable(field: KintoneField) : any{
        const referenceTable = field.getFieldProperties().referenceTable;
        if (!referenceTable) {
            return undefined
        }
        const displayFields : string[] = [];
        referenceTable.getDisplayFields().map((displayField) => {
            displayFields.push(displayField.fieldCode);
        });
        return {
            relatedApp : {
                app : referenceTable.appId,
                code : referenceTable.appCode,
            },
            condition : {
                field : referenceTable.condition.field,
                relatedField : referenceTable.condition.relatedField,
            }, 
            filterCond : referenceTable.getFilterCond(),
            displayFields : displayFields,
            sort : referenceTable.getSort(),
            size  : referenceTable.getSize(),
        };
    }

}