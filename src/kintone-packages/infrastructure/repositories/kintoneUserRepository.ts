import { KintoneUserRepositoryInterface } from "@kintone-packages/domain/interfaces/repositories/kintoneUserRepositoryInterface";
import { KintoneUser } from "@kintone-packages/domain/models/KintoneUser/kintoneUser";
import { KintoneJsPlugin } from "../externalapi/kintoneJsApi/kintoneJsPlugin";

export class KintoneUserRepository implements KintoneUserRepositoryInterface{
    get() : KintoneUser{
        return KintoneJsPlugin.getLoginUser();
    };
}