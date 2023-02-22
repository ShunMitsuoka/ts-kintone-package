import { AppId } from "../../models/KintoneApp/appId";
import { KintoneApp } from "../../models/KintoneApp/kintoneApp";
import { KintoneDeployStatus } from "../../models/KintoneDeployStatus/kintoneDeployStatus";


export interface KintoneAppRepositoryInterface{
    getCurrentAppId() : AppId;
    getByAppId(appId : AppId, preview? : boolean) : Promise<KintoneApp>;
    getAll() : Promise<Array<KintoneApp>>;
    create(app : KintoneApp) : Promise<KintoneApp>;
    update(app : KintoneApp) : Promise<boolean>;
    deploy(appArray:Array<KintoneApp>) : Promise<boolean>;
    deployRevert(appArray:Array<KintoneApp>) : Promise<boolean>;
    getDeployStatus(appArray:Array<KintoneApp>) : Promise<KintoneDeployStatus[]>;
    exist(appId : AppId) : Promise<boolean>;
} 