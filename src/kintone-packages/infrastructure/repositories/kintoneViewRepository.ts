import { KintoneApiErrorMessage } from "../../application/consts/kintoneApiErrorMessage";
import { KintoneViewRepositoryInterface } from "../../domain/interfaces/repositories/kintoneViewRepositoryInterface";
import { AppId } from "../../domain/models/KintoneApp/appId";
import { KintoneFieldCode } from "../../domain/models/KintoneField/kintoneFieldCode";
import { KintoneView } from "../../domain/models/KintoneViews/kintoneView";
import { KintoneViewId } from "../../domain/models/KintoneViews/kintoneViewId";
import { KintoneViews } from "../../domain/models/KintoneViews/kintoneViews";
import { KintoneRestViewApi } from "../externalapi/kintoneRestApi/kintoneRestViewApi";
import { BaseKintoneRepository } from "./baseKintoneRepository";

export class KintoneViewRepository extends BaseKintoneRepository implements KintoneViewRepositoryInterface{

    private kintoneRestViewApi : KintoneRestViewApi;

    public constructor(){
        super();
        this.kintoneRestViewApi = new KintoneRestViewApi();
    }
    
    async getAll(appId: AppId): Promise<KintoneViews> {
        let kintoneViews:KintoneView[] = [];
        let revision : number | undefined = undefined;

        await this.kintoneRestViewApi.getAll(appId)
        .then((resp) => {
            revision = Number(resp.revision);
            let views : Object = resp.views;
            for (const key in views) {
                const view = views[key];
                const fields : string[] = view.fields;
                kintoneViews.push(
                    new KintoneView(
                        new KintoneViewId(view.id),
                        view.name,
                        view.type,
                        fields.map(field => { return new KintoneFieldCode(field)}),
                        view.device,
                        view.filterCond,
                        view.sort,
                        Number(view.index),
                    )
                )
            }
        })
        .catch((error) => {
            this.catchKintoneApiError(error, KintoneApiErrorMessage.FAILED_TO_GET_ALL_VIEWS);
        });
        return new KintoneViews(kintoneViews, revision);
    }
}