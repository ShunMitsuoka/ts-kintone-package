import { PluginId } from "../../models/KintonePluginId/pluginId";

export interface KintonePluginIdRepositoryInterface{
    get() : PluginId;
} 