import { KintoneFieldTypeConst } from "@kintone-packages/domain/consts/kintoneFieldTypeConst";
import { KintoneField } from "../kintoneField";
import { KintoneFieldCode } from "../kintoneFieldCode";
import { KintoneFieldProperties } from "../kintoneFieldProperties";

export class CreatedTime extends KintoneField{

    static DefaultFieldCode = '作成日時';

    constructor(){
        super(
            new KintoneFieldCode(CreatedTime.DefaultFieldCode),
            new KintoneFieldProperties({
                label : CreatedTime.DefaultFieldCode ,
                type : KintoneFieldTypeConst.RECORD_NUMBER,
            })
        );
    }

}