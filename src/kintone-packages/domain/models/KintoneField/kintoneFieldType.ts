import { KintoneFieldTypeConst } from "@kintone-packages/domain/consts/kintoneFieldTypeConst";
import { ValueObject } from "@kintone-packages/domain/interfaces/models/valueObject";

export class KintoneFieldType implements ValueObject {
    readonly type : string;

    public constructor(type : string){
        this.type = type;
    }

    public isArrayValueFieldType() : boolean{
        switch (this.type) {
            case KintoneFieldTypeConst.CHECK_BOX.type:
            case KintoneFieldTypeConst.MULTI_SELECT.type:
            case KintoneFieldTypeConst.USER_SELECT.type:
            case KintoneFieldTypeConst.ORGANIZATION_SELECT.type:
            case KintoneFieldTypeConst.GROUP_SELECT.type:
            case KintoneFieldTypeConst.FILE.type:
            case KintoneFieldTypeConst.SUBTABLE.type:
                return true;
            default:
                break;
        }
        return false;
    }
}