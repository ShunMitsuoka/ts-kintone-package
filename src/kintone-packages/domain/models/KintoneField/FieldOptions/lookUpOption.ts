import { ValueObject } from "../../../interfaces/models/valueObject";
import { AppId } from "../../KintoneApp/appId";
import { KintoneFieldCode } from "../kintoneFieldCode";

export class LookUpOption implements ValueObject {

    readonly appId : AppId;
    readonly relatedKeyField : KintoneFieldCode;
    readonly appCode? : string;

    constructor(
        appId : AppId,
        relatedKeyField : KintoneFieldCode,
        appCode? : string,
    ){
        this.appId = appId;
        this.relatedKeyField = relatedKeyField;
        this.appCode = appCode;
    }

}