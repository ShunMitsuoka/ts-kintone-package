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
            "type": field.getFieldProperties().type.type,
            "code": field.getFieldCode(),
            "label": field.getFieldProperties().label,
            "noLabel": field.getFieldProperties().noLabel,
            "required": field.getFieldProperties().required,
            "unique": field.getFieldProperties().unique,
            "options": KintoneRestFieldApiConverter.makeOptions(field),
            "defaultValue": field.getFieldProperties().getDefaultValue(),
            "lookup": KintoneRestFieldApiConverter.makeLookUp(field),
        }
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
        const result = {};
        const lookUp = field.getFieldProperties().lookUp;
        if (!lookUp) {
            return undefined;
        }
        return {
            relatedApp : {
                app : lookUp.appId,
                code : lookUp.appCode,
            },
            relatedKeyField : lookUp.relatedKeyField.fieldCode
        };
    }

}