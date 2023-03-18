import { KintoneLanguageType } from "../../domain/models/KintoneUser/kintoneLanguage"

export type KintoneApiErrorMessageType = {
    ja : string,
    en : string,
    zh : string,
}

export class KintoneApiErrorMessage {
    /**
     * kintone App
     */
    static readonly FAILED_TO_GET_APP_INFO : KintoneApiErrorMessageType = {
        'ja': 'アプリ情報の取得に失敗しました。',
        'en': 'Failed to retrieve app information.',
        'zh': 'アプリ情報の取得に失敗しました。',
    }
    static readonly FAILED_TO_GET_ALL_APPS : KintoneApiErrorMessageType =  {
        'ja': 'アプリの全件取得に失敗しました。',
        'en': 'Failed to retrieve all apps.',
        'zh': 'アプリの全件取得に失敗しました。',
    }
    /**
     * kintone Record
     */
     static readonly FAILED_TO_GET_ALL_RECORD : KintoneApiErrorMessageType =  {
        'ja': 'レコードの全件取得に失敗しました。',
        'en': 'Failed to retrieve all records.',
        'zh': 'レコードの全件取得に失敗しました。',
    }
    static readonly FAILED_TO_CRAETE_RECORD : KintoneApiErrorMessageType =  {
        'ja': 'レコードの登録に失敗しました。',
        'en': 'Failed to register a record.',
        'zh': 'レコードの登録に失敗しました。',
    }
    static readonly FAILED_TO_UPDATE_RECORD : KintoneApiErrorMessageType =  {
        'ja': 'レコードの更新に失敗しました。',
        'en': 'Failed to update a record.',
        'zh': 'レコードの更新に失敗しました。',
    }
    static readonly FAILED_TO_DELETE_RECORD : KintoneApiErrorMessageType =  {
        'ja': 'レコードの削除に失敗しました。',
        'en': 'Failed to delete a record.',
        'zh': 'レコードの削除に失敗しました。',
    }
    /**
     * kintone FIELD
     */
    static readonly FAILED_TO_GET_ALL_FIELDS : KintoneApiErrorMessageType =  {
        'ja': 'フィールドの全件取得に失敗しました。',
        'en': 'Failed to retrieve all fields.',
        'zh': 'フィールドの全件取得に失敗しました。',
    }
    static readonly FAILED_TO_CRAETE_FIELD : KintoneApiErrorMessageType =  {
        'ja': 'フィールドの登録に失敗しました。',
        'en': 'Failed to register fields.',
        'zh': 'フィールドの登録に失敗しました。',
    }
    static readonly FAILED_TO_UPDATE_FIELD : KintoneApiErrorMessageType =  {
        'ja': 'フィールドの更新に失敗しました。',
        'en': 'Failed to update fields.',
        'zh': 'フィールドの更新に失敗しました。',
    }
    static readonly FAILED_TO_DELETE_FIELD : KintoneApiErrorMessageType =  {
        'ja': 'フィールドの削除に失敗しました。',
        'en': 'Failed to delete fields.',
        'zh': 'フィールドの削除に失敗しました。',
    }
    /**
     * kintone VIEW
     */
         static readonly FAILED_TO_GET_ALL_VIEWS : KintoneApiErrorMessageType =  {
            'ja': '一覧の全件取得に失敗しました。',
            'en': 'Failed to retrieve all views.',
            'zh': '一覧の全件取得に失敗しました。',
        }

    static getMessage(lang : KintoneLanguageType, messageObj : KintoneApiErrorMessageType) : string {
        return messageObj[lang];
    }
}