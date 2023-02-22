import { KintonePluginConfig } from "@kintone-packages/domain/models/KintonePluginConfig/kintonePluginConfig";
import { PluginId } from "@kintone-packages/domain/models/KintonePluginId/pluginId";

export interface KintonePluginConfigRepositoryInterface{
    get(pluginId : PluginId) : KintonePluginConfig;
    set(kintonePluginConfig:KintonePluginConfig) : Promise<KintonePluginConfig>;
    deleteAll() : Promise<void>;
} 