import { Entity } from "../../interfaces/models/entity";
import { KintoneFieldCode } from "../KintoneField/kintoneFieldCode";
import { KintoneViewId } from "./kintoneViewId";

export class KintoneView implements Entity {

    private _viewId: KintoneViewId;
    readonly name: string;
    readonly type: string;
    readonly fields: KintoneFieldCode[];
    readonly device: string;
    readonly filterCond: string;
    readonly sort: string;
    readonly index: number;

    static readonly KintoneViewType = {
        LIST: 'LIST',
        CALENDAR: 'CALENDAR',
        CUSTOM: 'CUSTOM',
    } as const;

    constructor(
        _viewId: KintoneViewId,
        name: string,
        type: string,
        fields: KintoneFieldCode[],
        device: string,
        filterCond: string,
        sort: string,
        index: number,
    ) {
        this._viewId = _viewId;
        this.name = name;
        this.type = type;
        this.fields = fields;
        this.device = device;
        this.filterCond = filterCond;
        this.sort = sort;
        this.index = index;
    }

    public getViewId(): KintoneViewId {
        return this._viewId;
    }

    public makeQuery(): string {
        let query = '';
        if (this.filterCond != '') {
            query += this.filterCond;
        }
        if (this.sort != '') {
            query += ' order by ' + this.sort;
        }
        return query;
    }
}