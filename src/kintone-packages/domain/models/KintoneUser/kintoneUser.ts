import { Entity } from "../../interfaces/models/entity";
import { KintoneLanguage, KintoneLanguageType } from "./kintoneLanguage";
import { KintoneUserId } from "./kintoneUserId";

export class KintoneUser implements Entity { 
    readonly userId : KintoneUserId;
    private name : string;
    private code : string;
    private email : string;
    private language : KintoneLanguage;

    constructor(
        userId: KintoneUserId,
        name: string,
        code: string,
        email: string,
        language: KintoneLanguageType,
        ) {
        this.userId = userId;
        this.name = name;
        this.code = code;
        this.email = email;
        this.language = new KintoneLanguage(language);
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
    public getLanguage() : KintoneLanguageType{
        return this.language.language;
    }
}