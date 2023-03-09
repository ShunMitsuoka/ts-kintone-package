
import { KintonePluginConfigRepositoryInterface } from "../../domain/interfaces/repositories/kintonePluginConfigRepositoryInterface";
import { PluginId } from "../../domain/models/KintonePluginId/pluginId";
import { KintoneJsPlugin } from "../externalapi/kintoneJsApi/kintoneJsPlugin";

export class KintonePluginConfigRepository implements KintonePluginConfigRepositoryInterface{

    public get(pluginId : PluginId) : any {
        try {
            const config = KintoneJsPlugin.getConfig(pluginId.id);
            return config;
        } catch (error) {
            return {};
        }
    }
    
    public set(config:any) : Promise<any> {
        return new Promise((resolve) => {
            KintoneJsPlugin.setConfig(config, () => {
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