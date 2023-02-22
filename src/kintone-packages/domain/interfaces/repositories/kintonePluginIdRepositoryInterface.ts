import { PluginId } from "@kintone-packages/domain/models/KintonePluginId/pluginId";

export interface KintonePluginIdRepositoryInterface{
    get() : PluginId;
} 