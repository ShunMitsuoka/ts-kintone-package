import { ValueObject } from "../../interfaces/models/valueObject";

export class KintoneDeployStatus implements ValueObject {
    static readonly PROCESSING = 'PROCESSING'
    static readonly SUCCESS = 'SUCCESS'
    static readonly FAIL = 'FAIL'
    static readonly CANCEL = 'CANCEL'

    readonly status : string;

    public constructor(status : string){
        this.status = status;
    }

    public isProcessing(){
        return this.status == KintoneDeployStatus.PROCESSING;
    }
}