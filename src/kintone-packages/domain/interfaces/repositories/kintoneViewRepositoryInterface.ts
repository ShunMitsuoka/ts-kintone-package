import { AppId } from "../../models/KintoneApp/appId";
import { KintoneViews } from "../../models/KintoneViews/kintoneViews";

export interface KintoneViewRepositoryInterface{
    getAll(appId: AppId) : Promise<KintoneViews>;
} 