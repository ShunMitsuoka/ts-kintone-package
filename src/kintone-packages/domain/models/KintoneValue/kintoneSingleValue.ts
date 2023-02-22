import { KintoneMessageService } from "@kintone-packages/domain/services/kintoneMessageService";
import { KintoneValue } from "./kintoneValue";

export class KintoneSingleValue extends KintoneValue {

    public constructor(value : string){
        if (typeof value !== "string") {
            throw new Error("valueはstring型である必要があります。");
        }
        if (value === "") {
            throw new Error("string型のvalueに空文字は設定できません");
        }
        super(value);
    }

    public getValue() : string{
        return this.value
    }

    public isArray() : boolean{
        return true
    }
}