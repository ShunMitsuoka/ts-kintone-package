import { AppId } from "../../../domain/models/KintoneApp/appId";
import { KintoneUser } from "../../../domain/models/KintoneUser/kintoneUser";
import { KintoneUserId } from "../../../domain/models/KintoneUser/kintoneUserId";


export class KintoneJsPlugin {
    public static getConfig(pluginId : string) : any{
        return kintone.plugin.app.getConfig(pluginId);
    }

    public static setConfig(config, successCallback){
        kintone.plugin.app.setConfig(config, successCallback);
    }

    public static getCurrentAppId() : AppId{
        const appId = kintone.app.getId();
        return new AppId(Number(appId));
    }

    public static getLoginUser() : KintoneUser{
        const info = kintone.getLoginUser();
        return new KintoneUser(
            new KintoneUserId(info.id),
            info.name,
            info.code,
            info.email,
            info.language,
        );
    }
}