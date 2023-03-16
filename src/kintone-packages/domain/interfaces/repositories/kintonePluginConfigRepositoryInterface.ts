import { PluginId } from "../../models/KintonePluginId/pluginId";


export interface KintonePluginConfigRepositoryInterface{
    get(pluginId : PluginId) : any;
    set(config:Object) : Promise<any>;
    deleteAll() : Promise<void>;
} 