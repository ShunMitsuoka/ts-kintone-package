import { PluginId } from "../../models/KintonePluginId/pluginId";


export interface KintonePluginConfigRepositoryInterface{
    get(pluginId : PluginId) : any;
    set(config:any) : Promise<any>;
    deleteAll() : Promise<void>;
} 