
import { KintonePluginConfigRepositoryInterface } from "../../domain/interfaces/repositories/kintonePluginConfigRepositoryInterface";
import { PluginId } from "../../domain/models/KintonePluginId/pluginId";
import { KintoneJsPlugin } from "../externalapi/kintoneJsApi/kintoneJsPlugin";

export class KintonePluginConfigRepository implements KintonePluginConfigRepositoryInterface{

    public get(pluginId : PluginId) : any {
        try {
            let config = {};
            const saveDate = KintoneJsPlugin.getConfig(pluginId.id);
            Object.keys(saveDate).forEach(function (key) {
                config[key] = JSON.parse(saveDate[key]);
            });
            return config;
        } catch (error) {
            return {};
        }
    }
    
    public set(config:Object) : Promise<any> {
        let saveDate = {};
        Object.keys(config).forEach(function (key) {
            if (typeof config[key] === "string" || config[key] instanceof String) {
                saveDate[key] = config[key];
            }else{
                saveDate[key] = JSON.stringify(config[key]);
            }
        });
        return new Promise((resolve) => {
            KintoneJsPlugin.setConfig(saveDate, () => {
                resolve(config);
            });
        });
    }

    public deleteAll(): Promise<void> {
        return new Promise(async (resolve) => {
            KintoneJsPlugin.setConfig({}, () => {
                resolve();
            });
        });
    }
} 