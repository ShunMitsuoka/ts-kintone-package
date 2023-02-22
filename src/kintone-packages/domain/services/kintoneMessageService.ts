import { KintoneMessageConst } from "../consts/kintoneMessageConst";

export class KintoneMessageService{

    static getMessage(key : string, lang : string = 'ja'){
        if(!KintoneMessageConst[key]){
            throw new Error("メッセージに存在しないキーが設定されました : '" +key+"'");
        }
        return KintoneMessageConst[key][lang];
    }

}