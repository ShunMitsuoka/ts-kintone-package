import { ValueObject } from "../../../interfaces/models/valueObject";
import { AppId } from "../../KintoneApp/appId";
import { KintoneFieldCode } from "../kintoneFieldCode";

export type ReferenceTableCondition = {
    field : KintoneFieldCode,
    relatedField : KintoneFieldCode,
}

export interface ReferenceTableProps {
    appId? : AppId,
    appCode? : string,
    condition : ReferenceTableCondition,
    filterCond? : string,
    displayFields : KintoneFieldCode[],
    sort? : string,
    size? : number,
}

export class ReferenceTable implements ValueObject {

    readonly appId? : AppId;
    readonly condition : ReferenceTableCondition;
    readonly appCode? : string;
    private filterCond? : string;
    private displayFields : KintoneFieldCode[];
    private sort? : string;
    private size? : number;

    constructor(props : ReferenceTableProps){
        this.appId = props.appId;
        this.condition = props.condition;
        this.appCode = props.appCode;
        this.filterCond = props.filterCond;
        this.displayFields = props.displayFields;
        this.sort = props.sort;
        this.size = props.size;
    }
    getFilterCond() : string | undefined{
        return this.filterCond;
    }
    getDisplayFields() : KintoneFieldCode[]{
        return this.displayFields;
    }
    getSort() : string | undefined{
        return this.sort;
    }
    getSize() : number | undefined{
        return this.size;
    }
}