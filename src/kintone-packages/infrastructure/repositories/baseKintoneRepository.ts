import { KintoneApiErrorMessage, KintoneApiErrorMessageType } from "../../application/consts/kintoneApiErrorMessage";
import { KintoneApiError } from "../../application/model/errors/kintoneApiError";
import { KintoneErrorService } from "../../application/services/kintoneErrorService";
import { KintoneJsPlugin } from "../externalapi/kintoneJsApi/kintoneJsPlugin";

export class BaseKintoneRepository {
    protected catchKintoneApiError(error, messageKey : KintoneApiErrorMessageType){
        const user = KintoneJsPlugin.getLoginUser();
        const lang = user.getLanguage();
        let messageTitle:string = KintoneErrorService.getKintoneErrorTitle(error);
        let details = KintoneErrorService.getKintoneErrorDetails(error);
        if(messageTitle != '' || details !== undefined && Object.keys(details).length > 0){
            const title = KintoneApiErrorMessage.getMessage(lang, messageKey);
            throw new KintoneApiError(
                title,
                messageTitle,
                details,
            );
        }
        throw new Error(error);
    }
}
