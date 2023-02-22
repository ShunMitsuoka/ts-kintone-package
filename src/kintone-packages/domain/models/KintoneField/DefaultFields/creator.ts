import { KintoneFieldTypeConst } from "@kintone-packages/domain/consts/kintoneFieldTypeConst";
import { KintoneField } from "../kintoneField";
import { KintoneFieldCode } from "../kintoneFieldCode";
import { KintoneFieldProperties } from "../kintoneFieldProperties";

export class Creator extends KintoneField{

    static DefaultFieldCode = '作業者';

    constructor(){
        super(
            new KintoneFieldCode(Creator.DefaultFieldCode),
            new KintoneFieldProperties({
                label : Creator.DefaultFieldCode ,
                type : KintoneFieldTypeConst.RECORD_NUMBER,
            })
        );
    }

}