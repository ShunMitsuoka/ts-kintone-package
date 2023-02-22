export class BaseKintoneRepository {
    protected catchKintoneApiError(error, messageKey : string){
        throw new Error(error);
    }
}
