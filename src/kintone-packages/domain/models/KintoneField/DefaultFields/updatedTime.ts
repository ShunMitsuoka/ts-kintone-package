import { KintoneFieldTypeConst } from "@kintone-packages/domain/consts/kintoneFieldTypeConst";
import { KintoneField } from "../kintoneField";
import { KintoneFieldCode } from "../kintoneFieldCode";
import { KintoneFieldProperties } from "../kintoneFieldProperties";

export class UpdatedTime extends KintoneField{

    static DefaultFieldCode = '更新日時';

    constructor(){
        super(
            new KintoneFieldCode(UpdatedTime.DefaultFieldCode),
            new KintoneFieldProperties({
                label : UpdatedTime.DefaultFieldCode ,
                type : KintoneFieldTypeConst.RECORD_NUMBER,
            })
        );
    }

}