
import { KintoneUserRepositoryInterface } from "../../domain/interfaces/repositories/kintoneUserRepositoryInterface";
import { KintoneUser } from "../../domain/models/KintoneUser/kintoneUser";
import { KintoneJsPlugin } from "../externalapi/kintoneJsApi/kintoneJsPlugin";

export class KintoneUserRepository implements KintoneUserRepositoryInterface{
    get() : KintoneUser{
        return KintoneJsPlugin.getLoginUser();
    };
}