import { KintoneFieldTypeConst } from "@kintone-packages/domain/consts/kintoneFieldTypeConst";
import { KintoneField } from "../kintoneField";
import { KintoneFieldCode } from "../kintoneFieldCode";
import { KintoneFieldProperties } from "../kintoneFieldProperties";

export class Category extends KintoneField{

    static DefaultFieldCode = 'カテゴリー';

    constructor(){
        super(
            new KintoneFieldCode(Category.DefaultFieldCode),
            new KintoneFieldProperties({
                label : Category.DefaultFieldCode ,
                type : KintoneFieldTypeConst.RECORD_NUMBER,
            })
        );
    }

}