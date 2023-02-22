import { KintoneAppRepositoryInterface } from "../interfaces/repositories/kintoneAppRepositoryInterface";
import { KintoneApp } from "../models/KintoneApp/kintoneApp";
import { KintoneDeployStatus } from "../models/KintoneDeployStatus/kintoneDeployStatus";

export class KintoneAppDeployService{
    private kintoneAppRepository: KintoneAppRepositoryInterface;
    constructor(
        kintoneAppRepository: KintoneAppRepositoryInterface,
    ) {
        this.kintoneAppRepository = kintoneAppRepository;
    }

    public async deploySelf() : Promise<boolean>{
        let currentAppId = this.kintoneAppRepository.getCurrentAppId();
        let currentApp = new KintoneApp(currentAppId, '');
        return await this.kintoneAppRepository.deploy([currentApp]);
    }

    public async deployRevertSelf() : Promise<boolean>{
        let currentAppId = this.kintoneAppRepository.getCurrentAppId();
        let currentApp = new KintoneApp(currentAppId, '');
        return await this.kintoneAppRepository.deployRevert([currentApp]);
    }

    public async getSelfDeployStatus() : Promise<KintoneDeployStatus>{
        let currentAppId = this.kintoneAppRepository.getCurrentAppId();
        let currentApp = new KintoneApp(currentAppId, '');
        const statuses = await this.kintoneAppRepository.getDeployStatus([currentApp]);
        return statuses[0];
    }

    public async isDeployProcessing() : Promise<boolean> {
        const status = await this.getSelfDeployStatus();
        if(status.status == KintoneDeployStatus.PROCESSING){
            return true;
        }
        return false;
    }

    public async isCurrentAppPublic() : Promise<boolean> {
        let currentAppId = this.kintoneAppRepository.getCurrentAppId();
        try {
            await this.kintoneAppRepository.getByAppId(currentAppId);
            return true;
        } catch (error) {
            return false;
        }
    }
}