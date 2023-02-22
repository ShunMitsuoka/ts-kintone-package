import { KintoneFieldTypeConst } from "../../../consts/kintoneFieldTypeConst";
import { KintoneField } from "../kintoneField";
import { KintoneFieldCode } from "../kintoneFieldCode";
import { KintoneFieldProperties } from "../kintoneFieldProperties";

export class Status extends KintoneField{

    static DefaultFieldCode = 'ステータス';

    constructor(){
        super(
            new KintoneFieldCode(Status.DefaultFieldCode),
            new KintoneFieldProperties({
                label : Status.DefaultFieldCode ,
                type : KintoneFieldTypeConst.RECORD_NUMBER,
            })
        );
    }

}