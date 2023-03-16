import { KintoneFieldType } from "../models/KintoneField/kintoneFieldType";

export class KintoneFieldTypeConst {
    static readonly GROUP:KintoneFieldType = new KintoneFieldType('GROUP');
    static readonly GROUP_SELECT:KintoneFieldType = new KintoneFieldType('GROUP_SELECT');
    static readonly CHECK_BOX:KintoneFieldType = new KintoneFieldType('CHECK_BOX');
    static readonly SUBTABLE:KintoneFieldType = new KintoneFieldType('SUBTABLE');
    static readonly DROP_DOWN:KintoneFieldType = new KintoneFieldType('DROP_DOWN');
    static readonly USER_SELECT:KintoneFieldType = new KintoneFieldType('USER_SELECT');
    static readonly RADIO_BUTTON:KintoneFieldType = new KintoneFieldType('RADIO_BUTTON');
    static readonly RICH_TEXT:KintoneFieldType = new KintoneFieldType('RICH_TEXT');
    static readonly LINK:KintoneFieldType = new KintoneFieldType('LINK');
    static readonly REFERENCE_TABLE:KintoneFieldType = new KintoneFieldType('REFERENCE_TABLE');
    static readonly CALC:KintoneFieldType = new KintoneFieldType('CALC');
    static readonly TIME:KintoneFieldType = new KintoneFieldType('TIME');
    static readonly NUMBER:KintoneFieldType = new KintoneFieldType('NUMBER');
    static readonly ORGANIZATION_SELECT:KintoneFieldType = new KintoneFieldType('ORGANIZATION_SELECT');
    static readonly FILE:KintoneFieldType = new KintoneFieldType('FILE');
    static readonly DATETIME:KintoneFieldType = new KintoneFieldType('DATETIME');
    static readonly DATE:KintoneFieldType = new KintoneFieldType('DATE');
    static readonly MULTI_SELECT:KintoneFieldType = new KintoneFieldType('MULTI_SELECT');
    static readonly SINGLE_LINE_TEXT:KintoneFieldType = new KintoneFieldType('SINGLE_LINE_TEXT');
    static readonly MULTI_LINE_TEXT:KintoneFieldType = new KintoneFieldType('MULTI_LINE_TEXT');
    static readonly RECORD_NUMBER:KintoneFieldType = new KintoneFieldType('RECORD_NUMBER');
    static readonly STATUS_ASSIGNEE:KintoneFieldType = new KintoneFieldType('STATUS_ASSIGNEE');
    static readonly CREATOR:KintoneFieldType = new KintoneFieldType('CREATOR');
    static readonly MODIFIER:KintoneFieldType = new KintoneFieldType('MODIFIER');
    static readonly CREATED_TIME:KintoneFieldType = new KintoneFieldType('CREATED_TIME');
    static readonly UPDATED_TIME:KintoneFieldType = new KintoneFieldType('UPDATED_TIME');
    static readonly STATUS:KintoneFieldType = new KintoneFieldType('STATUS');
    static readonly CATEGORY:KintoneFieldType = new KintoneFieldType('CATEGORY');
    static readonly LOOK_UP:KintoneFieldType = new KintoneFieldType('LOOK_UP');
}