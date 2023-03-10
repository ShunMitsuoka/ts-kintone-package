import { ValueObject } from "../../interfaces/models/valueObject";
import { KintoneView } from "./kintoneView";

export class KintoneViews implements ValueObject {
    
    private views : KintoneView[];
    private revision? : number;

    constructor(
        views:KintoneView[],
        revision?:number,
    ){
        this.views = views;
        this.revision = revision ? revision : undefined;
    }

    getViews() : KintoneView[]{
        return this.views;
    }

    getView(viewId : number) : KintoneView{
        for (let i = 0; i < this.views.length; i++) {
            const view = this.views[i];
            if(view.getViewId().id == viewId){
                return view;
            }
        }
        throw new Error("存在しないviewIdが指定されました。");
    }
}