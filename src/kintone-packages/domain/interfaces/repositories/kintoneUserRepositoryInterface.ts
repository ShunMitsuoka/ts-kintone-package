import { KintoneUser } from "@kintone-packages/domain/models/KintoneUser/kintoneUser";

export interface KintoneUserRepositoryInterface{
    get() : KintoneUser;
} 