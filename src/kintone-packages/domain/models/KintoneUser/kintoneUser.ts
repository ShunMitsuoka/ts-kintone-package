import { Entity } from "@kintone-packages/domain/interfaces/models/entity";
import { KintoneUserId } from "./kintoneUserId";

export class KintoneUser implements Entity { 
    readonly userId : KintoneUserId;
    private name : string;
    private code : string;
    private email : string;
    private language : string;

    constructor(
        userId: KintoneUserId,
        name: string,
        code: string,
        email: string,
        language: string,
        ) {
        this.userId = userId;
        this.name = name;
        this.code = code;
        this.email = email;
        this.language = language;
    }
    public getName() : string{
        return this.name;
    }
    public getCode() : string{
        return this.code;
    }
    public getEmail() : string{
        return this.email;
    }
    public getLanguage() : string{
        return this.language;
    }
}