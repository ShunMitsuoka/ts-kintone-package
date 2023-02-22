import { KintonePluginConfig } from "../../models/KintonePluginConfig/kintonePluginConfig";
import { PluginId } from "../../models/KintonePluginId/pluginId";


export interface KintonePluginConfigRepositoryInterface{
    get(pluginId : PluginId) : KintonePluginConfig;
    set(kintonePluginConfig:KintonePluginConfig) : Promise<KintonePluginConfig>;
    deleteAll() : Promise<void>;
} 