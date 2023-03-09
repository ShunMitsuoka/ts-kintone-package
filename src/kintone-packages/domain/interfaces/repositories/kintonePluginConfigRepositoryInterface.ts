import { PluginId } from "../../models/KintonePluginId/pluginId";


export interface KintonePluginConfigRepositoryInterface{
    get(pluginId : PluginId) : Object;
    set(config:Object) : Promise<Object>;
    deleteAll() : Promise<void>;
} 