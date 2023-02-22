import { KintoneUser } from "../../models/KintoneUser/kintoneUser";

export interface KintoneUserRepositoryInterface{
    get() : KintoneUser;
} 