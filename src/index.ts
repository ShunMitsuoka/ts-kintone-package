import { KintoneAppConst } from "@kintone-packages/domain/consts/kintoneAppConst";
import { KintoneFieldTypeConst } from "@kintone-packages/domain/consts/kintoneFieldTypeConst";
import { AppId } from "@kintone-packages/domain/models/KintoneApp/appId";
import { KintoneApp } from "@kintone-packages/domain/models/KintoneApp/kintoneApp";
import { KintoneDeployStatus } from "@kintone-packages/domain/models/KintoneDeployStatus/kintoneDeployStatus";

type modules = {
    KintoneAppConst : typeof KintoneAppConst
    KintoneFieldTypeConst : typeof KintoneFieldTypeConst
    AppId : typeof AppId
    KintoneApp : typeof KintoneApp
    KintoneDeployStatus : typeof KintoneDeployStatus
}

const kintoneModules:modules = {
    KintoneAppConst : KintoneAppConst,
    KintoneFieldTypeConst : KintoneFieldTypeConst,
    AppId : AppId,
    KintoneApp : KintoneApp,
    KintoneDeployStatus : KintoneDeployStatus
};

module.exports.default = kintoneModules;