import { KintoneFieldTypeConst } from "../../../consts/kintoneFieldTypeConst";
import { KintoneField } from "../kintoneField";
import { KintoneFieldCode } from "../kintoneFieldCode";
import { KintoneFieldProperties } from "../kintoneFieldProperties";

export class Modifier extends KintoneField{

    static DefaultFieldCode = '更新者';

    constructor(){
        super(
            new KintoneFieldCode(Modifier.DefaultFieldCode),
            new KintoneFieldProperties({
                label : Modifier.DefaultFieldCode ,
                type : KintoneFieldTypeConst.RECORD_NUMBER,
            })
        );
    }

}