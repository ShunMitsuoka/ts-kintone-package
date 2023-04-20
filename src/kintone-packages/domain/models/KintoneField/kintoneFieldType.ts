import { KintoneFieldTypeConst } from "../../consts/kintoneFieldTypeConst";
import { ValueObject } from "../../interfaces/models/valueObject";

export class KintoneFieldType implements ValueObject {
    readonly type : string;

    public constructor(type : string){
        this.type = type;
    }

    public isAbleToRetrieveValue() : boolean{
        switch (this.type) {
            case KintoneFieldTypeConst.REFERENCE_TABLE.type:
                return false;
            default:
                break;
        }
        return true;
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
            case KintoneFieldTypeConst.CATEGORY.type:
            case KintoneFieldTypeConst.STATUS_ASSIGNEE.type:
                return true;
            default:
                break;
        }
        return false;
    }

    public isObjectValueFieldType() : boolean{
        switch (this.type) {
            case KintoneFieldTypeConst.CREATOR.type:
            case KintoneFieldTypeConst.MODIFIER.type:
                return true;
            default:
                break;
        }
        return false;
    }

    public isLookUpCopyFieldType() : boolean{
        switch (this.type) {
            case KintoneFieldTypeConst.SINGLE_LINE_TEXT.type:
            case KintoneFieldTypeConst.NUMBER.type:
            case KintoneFieldTypeConst.CALC.type:
            case KintoneFieldTypeConst.LOOK_UP.type:
            case KintoneFieldTypeConst.LINK.type:
            case KintoneFieldTypeConst.RECORD_NUMBER.type:
                return true;
            default:
                break;
        }
        return false;
    }
}