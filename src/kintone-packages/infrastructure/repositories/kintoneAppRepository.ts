
import { KintoneAppConst } from "../../domain/consts/kintoneAppConst";
import { KintoneAppRepositoryInterface } from "../../domain/interfaces/repositories/kintoneAppRepositoryInterface";
import { AppId } from "../../domain/models/KintoneApp/appId";
import { KintoneApp } from "../../domain/models/KintoneApp/kintoneApp";
import { KintoneDeployStatus } from "../../domain/models/KintoneDeployStatus/kintoneDeployStatus";
import { KintoneFields } from "../../domain/models/KintoneFields/kintoneFields";
import { KintoneJsPlugin } from "../externalapi/kintoneJsApi/kintoneJsPlugin";
import { KintoneRestAppApi } from "../externalapi/kintoneRestApi/kintoneRestAppApi";
import { BaseKintoneRepository } from "./baseKintoneRepository";
import { KintoneFieldsRepository } from "./kintoneFieldsRepository";

export class KintoneAppRepository extends BaseKintoneRepository implements KintoneAppRepositoryInterface{

    private kintoneRestAppApi : KintoneRestAppApi;
    private kintoneFieldsRepository : KintoneFieldsRepository;

    public constructor(){
        super();
        this.kintoneRestAppApi = new KintoneRestAppApi();
        this.kintoneFieldsRepository = new KintoneFieldsRepository();
    }
    getCurrentAppId(): AppId {
        return KintoneJsPlugin.getCurrentAppId();
    }

    async getCurrentApp(preview : boolean = false): Promise<KintoneApp> {
        const currentAppId = KintoneJsPlugin.getCurrentAppId();
        return this.getByAppId(currentAppId, preview);
    }

    async getByAppId(appId: AppId, preview : boolean = false): Promise<KintoneApp> {
        const res = await this.kintoneRestAppApi.get(appId)
        .catch((error) => {
            this.catchKintoneApiError(error, 'FAILED_TO_GET_APP_INFO');
        });
        const app = new KintoneApp(
            new AppId(res.appId),
            res.name,
            res.spaceId,
            res.threadId,
        )
        const fieldsRes = await this.kintoneFieldsRepository.getAll(appId, preview);
        app.setFields(new KintoneFields(fieldsRes));
        return app;
    }
    
    async getAll(result: KintoneApp[] = [], _params?: any): Promise<KintoneApp[]> {
        _params = _params ? _params : {};
        // limit設定
        let limit = (_params && _params.limit) ? _params.limit : KintoneAppConst.App.GET_MAX_LIMIT;
        if(limit > KintoneAppConst.App.GET_MAX_LIMIT){
            console.error('アプリ一括取得のlimit上限を超えたレコード数を取得する事は出来ません。');
            limit = KintoneAppConst.App.GET_MAX_LIMIT;
        }
        // offset設定
        let offset = (_params && _params.offset) ? _params.offset : 0;
        if(offset > KintoneAppConst.App.GET_MAX_OFFSET){
            console.error('アプリ一括取得のOffset上限を超えたレコード数を取得する事は出来ません。');
            return result;
        }
        let kintoneApps:KintoneApp[] = [];
        await this.kintoneRestAppApi.getAll(limit, offset)
        .then((resp) => {
            resp.apps.forEach((app) => {
                kintoneApps.push(
                    new KintoneApp(
                        new AppId(app.appId),
                        app.name,
                        app.spaceId,
                        app.threadId,
                    )
                )
            });
        })
        .catch((error) => {
            this.catchKintoneApiError(error, 'FAILED_TO_GET_ALL_APPS');
        });
        Array.prototype.push.apply(result, kintoneApps);
        if(kintoneApps.length === limit){
            _params.offset = offset + kintoneApps.length;
            return await this.getAll(result, _params);
        }else{
            return result;
        }
    }
    exist(appId: AppId): Promise<boolean> {
        return new Promise(async (resolve) => {
            try {
                await this.kintoneRestAppApi.get(appId);
                resolve(true);
            } catch (error) {
                resolve(false);
            }
        });
    }
    create(app: KintoneApp): Promise<KintoneApp> {
        return new Promise(async (resolve) => {
            const createAppRes = await this.kintoneRestAppApi.create(app);
            const appId = createAppRes.app;
            app.setAppId(new AppId(appId));
            // フィールド情報保存
            const createFieldsRes = await this.kintoneFieldsRepository.create(app);
            resolve(app);
        });
    }
    async update(app: KintoneApp): Promise<boolean> {
        await this.kintoneRestAppApi.update(app);
        return true;
    }
    deploy(appArray: KintoneApp[]): Promise<boolean> {
        return new Promise(async (resolve) => {
            const res = await this.kintoneRestAppApi.deploy(appArray);
            resolve(true);
        });
    }
    deployRevert(appArray: KintoneApp[]): Promise<boolean> {
        return new Promise(async (resolve) => {
            const res = await this.kintoneRestAppApi.deploy(appArray, true);
            resolve(true);
        });
    }
    async getDeployStatus(appArray: KintoneApp[]): Promise<KintoneDeployStatus[]> {
        const res = await this.kintoneRestAppApi.getDeployStatus(appArray);
        const result:KintoneDeployStatus[] = [];
        for (let i = 0; i < res.apps.length; i++) {
            const app = res.apps[i];
            result.push(new KintoneDeployStatus(app.status));
        }
        return result;
    }
}