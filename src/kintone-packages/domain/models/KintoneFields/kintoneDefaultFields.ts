import { Category } from "../KintoneField/DefaultFields/category";
import { CreatedTime } from "../KintoneField/DefaultFields/createdTime";
import { Creator } from "../KintoneField/DefaultFields/creator";
import { Modifier } from "../KintoneField/DefaultFields/modifier";
import { RecordNumber } from "../KintoneField/DefaultFields/recordNumber";
import { Status } from "../KintoneField/DefaultFields/status";
import { StatusAssignee } from "../KintoneField/DefaultFields/statusAssignee";
import { UpdatedTime } from "../KintoneField/DefaultFields/updatedTime";
import { KintoneFields } from "./kintoneFields";

export class KintoneDefaultFields extends KintoneFields {

    static readonly dafaultFields = new Map([
        [RecordNumber.DefaultFieldCode , new RecordNumber()],
        [Status.DefaultFieldCode , new Status()],
        [Category.DefaultFieldCode , new Category()],
        [StatusAssignee.DefaultFieldCode , new StatusAssignee()],
        [Creator.DefaultFieldCode , new Creator()],
        [Modifier.DefaultFieldCode , new Modifier()],
        [CreatedTime.DefaultFieldCode , new CreatedTime()],
        [UpdatedTime.DefaultFieldCode , new UpdatedTime()],
    ]);

    constructor(){
        super(KintoneDefaultFields.dafaultFields);
    }
}