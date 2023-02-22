import { KintoneFieldTypeConst } from "../../../consts/kintoneFieldTypeConst";
import { KintoneField } from "../kintoneField";
import { KintoneFieldCode } from "../kintoneFieldCode";
import { KintoneFieldProperties } from "../kintoneFieldProperties";

export class RecordNumber extends KintoneField{

    static DefaultFieldCode = 'レコード番号';

    constructor(){
        super(
            new KintoneFieldCode(RecordNumber.DefaultFieldCode),
            new KintoneFieldProperties({
                label : RecordNumber.DefaultFieldCode ,
                type : KintoneFieldTypeConst.RECORD_NUMBER,
            })
        );
    }

}