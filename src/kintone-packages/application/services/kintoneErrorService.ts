import { KintoneApiError } from "../model/errors/kintoneApiError";

export class KintoneErrorService{

    public static getKintoneErrorTitle(kintoneError) : string{
        if (kintoneError.message !== undefined) {
            return kintoneError.message;
        }
        return '';
    }

    public static getKintoneErrorDetails(kintoneError){
        let errorDetails = {};
        if(kintoneError.errors && typeof kintoneError.errors === 'object'){
            const errors = kintoneError.errors;
            for (const errorKey in errors) {
                if (Object.prototype.hasOwnProperty.call(errors, errorKey)) {
                    const errorObj = errors[errorKey];
                    if(errorObj.messages && Array.isArray(errorObj.messages)){
                        errorDetails[errorKey] = errorObj.messages;
                    }
                }
            }
        }
        if(Object.keys(errorDetails).length > 0){
            return errorDetails;
        }else{
            return undefined;
        }
    }

    public static getRecordValueErrorFieldCode(errorDetailKey:string) : string | undefined {
        if(errorDetailKey.match(/^record\./) && errorDetailKey.match(/\.value$/)){
            const fieldCode = errorDetailKey.replace(/^record\./g, '').replace(/\.value$/g, '');
            return fieldCode;
        }
        if(errorDetailKey.match(/^record\[/) && errorDetailKey.match(/\]\.value$/)){
            const fieldCode = errorDetailKey.replace(/^record\[/g, '').replace(/\]\.value$/g, '');
            return fieldCode;
        }
        return undefined;
    }

    public static makeKintoneApiErrorMessage(error : Error):string{
        let errorMsg = '';
        if(!(error instanceof KintoneApiError)){
            return errorMsg;
        }
        if(error.subTitle && error.subTitle !== ''){   
            if(errorMsg !== '') errorMsg += '\n';
            errorMsg += error.subTitle;
        }
        if(error.errorDetails !== null){   
            for (const errorDetailKey in error.errorDetails) {
                if (Object.prototype.hasOwnProperty.call(error.errorDetails, errorDetailKey)) {
                    const errorMessages:Array<string> = error.errorDetails[errorDetailKey];
                    const fieldCode = KintoneErrorService.getRecordValueErrorFieldCode(errorDetailKey);
                    if(fieldCode){
                        for (let i = 0; i < errorMessages.length; i++) {
                            const errorMessage = errorMessages[i];
                            if(errorMsg !== '') errorMsg += '\n';
                            errorMsg += '「'+fieldCode+'」:' + errorMessage;
                        }
                    }
                }
            }
        }
        return errorMsg;
    }

}