import { AppId } from "../../../domain/models/KintoneApp/appId";

export class KintoneRestViewApi {
    public getAll(appId: AppId, lang: string | null = null) : Promise<any>{
        const params = {
            app: appId.id,
        };
        if (lang) {
            params['lang'] = lang;
        }
        return kintone.api(
            kintone.api.url('/k/v1/app/views.json',true), // - pathOrUrl
            'GET',                                // - method
            params,                                // - params
        )
    }
}