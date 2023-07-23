import { AppId } from "../../kintone-packages/domain/models/KintoneApp/appId";

export class KintoneAppRepository {
    getCurrentAppId(): AppId {
        return new AppId(120);
    }
}