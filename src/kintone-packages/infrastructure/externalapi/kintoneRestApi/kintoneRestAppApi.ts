import { AppId } from "../../../domain/models/KintoneApp/appId";
import { KintoneApp } from "../../../domain/models/KintoneApp/kintoneApp";


export class KintoneRestAppApi {
    public getAll(limit: number, offset: number) : Promise<any>{
        const params = {
            limit: limit,
            offset: offset,
        };
        return kintone.api(
            kintone.api.url('/k/v1/apps.json',true), // - pathOrUrl
            'GET',                                // - method
            params,                                // - params
        )
    }
    public get(appId: AppId) : Promise<any>{
        const params = {
            id: appId.id,
        };
        return kintone.api(
            kintone.api.url('/k/v1/app.json',true), // - pathOrUrl
            'GET',                                // - method
            params,                                // - params
        )
    }
    public create(app : KintoneApp) : Promise<any>{
        const params = {
            "name": app.appName,
        };
        if(!app.space){
            params["space"] = app.space;
        }
        if(!app.thread){
            params["thread"] = app.thread;
        }
        return kintone.api(
            kintone.api.url('/k/v1/preview/app.json',true), // - pathOrUrl
            'POST',                                // - method
            params,                                // - params
        )
    }
    public update(app : KintoneApp) : Promise<any>{
        const params = {
            "app": app.getAppId().id,
            "name": app.appName,
        };
        return kintone.api(
            kintone.api.url('/k/v1/preview/app/settings.json',true), // - pathOrUrl
            'PUT',                                // - method
            params,                                // - params
        )
    }
    public deploy(appArray: KintoneApp[], revert: boolean = false) : Promise<any>{
        const apps:any = [];
        appArray.forEach(function (kintoneApp) {
            const app = {
                "app": kintoneApp.getAppId().id,
            }
            if(!kintoneApp.getRevision()){
                app["revision"] = kintoneApp.getRevision();
            }
            apps.push(app);
        });
        const params = {
            "apps" : apps,
            "revert" : revert
        };
        return kintone.api(
            kintone.api.url('/k/v1/preview/app/deploy.json',true), // - pathOrUrl
            'POST',                                // - method
            params,                                // - params
        )
    }
    public getDeployStatus(appArray: KintoneApp[]) : Promise<any>{
        const apps:number[] = [];
        appArray.forEach(function (kintoneApp) {
            apps.push(kintoneApp.getAppId().id);
        });
        const params = {
            "apps" : apps,
        };
        return kintone.api(
            kintone.api.url('/k/v1/preview/app/deploy.json',true), // - pathOrUrl
            'GET',                                // - method
            params,                                // - params
        )
    }
}