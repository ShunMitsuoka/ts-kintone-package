import { Entity } from "../../interfaces/models/entity";

export class KintonePluginConfig implements Entity {
    private config : any;

    public constructor(config : any){
        this.config = config;
    }

    public getConfig() : any{
        return this.config;
    }

    static getDefalutConfig() : KintonePluginConfig{
        return new KintonePluginConfig({});
    }

    static getSize(config : any) : number{
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