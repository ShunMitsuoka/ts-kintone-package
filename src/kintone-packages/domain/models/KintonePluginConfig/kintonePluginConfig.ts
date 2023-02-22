import { Entity } from "@kintone-packages/domain/interfaces/models/entity";

export interface KintoneConfigProps {}

export class KintonePluginConfig implements Entity {
    private config : KintoneConfigProps;

    public constructor(config : KintoneConfigProps){
        this.config = config;
    }

    public getConfig() : KintoneConfigProps{
        return this.config;
    }

    static getDefalutConfig() : KintonePluginConfig{
        return new KintonePluginConfig({});
    }

    static getSize(config : KintoneConfigProps) : number{
        let size = 0;
        const kb = 1024;
        if(config){
            let allValue = '';
            for (const key in config) {
                if (Object.prototype.hasOwnProperty.call(config, key)) {
                    const value = config[key];
                    if(value){
                        allValue += value;
                    }
                }
            }
            size = encodeURI(allValue).replace(/%../g, "*").length;
        }
        return Math.ceil(size/kb);
    }
}