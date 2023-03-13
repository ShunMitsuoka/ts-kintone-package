export class BaseKintoneRepository {
    protected catchKintoneApiError(error){
        throw new Error(error);
    }
}
