import { KintoneFieldTypeConst } from "../../../consts/kintoneFieldTypeConst";
import { KintoneField } from "../kintoneField";
import { KintoneFieldCode } from "../kintoneFieldCode";
import { KintoneFieldProperties } from "../kintoneFieldProperties";

export class StatusAssignee extends KintoneField{

    static DefaultFieldCode = '作業者';

    constructor(){
        super(
            new KintoneFieldCode(StatusAssignee.DefaultFieldCode),
            new KintoneFieldProperties({
                label : StatusAssignee.DefaultFieldCode ,
                type : KintoneFieldTypeConst.RECORD_NUMBER,
            })
        );
    }

}