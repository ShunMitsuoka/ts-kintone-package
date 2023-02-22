
import { KintonePluginConfigRepositoryInterface } from "../../domain/interfaces/repositories/kintonePluginConfigRepositoryInterface";
import { KintonePluginConfig } from "../../domain/models/KintonePluginConfig/kintonePluginConfig";
import { PluginId } from "../../domain/models/KintonePluginId/pluginId";
import { KintoneJsPlugin } from "../externalapi/kintoneJsApi/kintoneJsPlugin";

export class KintonePluginConfigRepository implements KintonePluginConfigRepositoryInterface{

    public get(pluginId : PluginId) : KintonePluginConfig {
        try {
            const config = KintoneJsPlugin.getConfig(pluginId.id);
            const kintoneConfig = new KintonePluginConfig(config);
            return kintoneConfig;
        } catch (error) {
            return KintonePluginConfig.getDefalutConfig();
        }
    }
    
    public set(kintoneConfig:KintonePluginConfig) : Promise<KintonePluginConfig> {
        return new Promise((resolve) => {
            KintoneJsPlugin.setConfig(kintoneConfig.getConfig(), () => {
                resolve(kintoneConfig);
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