import { AppId } from "../../domain/models/KintoneApp/appId";
import { LookUpOption } from "../../domain/models/KintoneField/FieldOptions/lookUpOption";
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

    static makeLookUp(property : any) : LookUpOption | undefined{
        if (!property.lookup) {
            return undefined
        }
        const lookup = property.lookup;
        return new LookUpOption(
            new AppId(lookup.relatedApp.app),
            new KintoneFieldCode(lookup.relatedKeyField),
            lookup.relatedApp.code
        );
    }

}