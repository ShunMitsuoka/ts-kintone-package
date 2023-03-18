import { ValueObject } from "../../interfaces/models/valueObject";

export type KintoneLanguageType = 'ja' | 'en' | 'zh';

export class KintoneLanguage implements ValueObject { 
    readonly language : KintoneLanguageType;
    constructor(language: KintoneLanguageType) {
        this.language = language;
    }
}