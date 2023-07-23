import { AppId } from "../../../../../kintone-packages/domain/models/KintoneApp/appId";

test('AppIDに1を設定して、AppIDを取得すると1が取得できる。', () => {
    const appId = new AppId(1);
    expect(appId.id).toBe(1);
});

test('AppIDに2を設定して、AppIDを取得すると2が取得できる。', () => {
    const appId = new AppId(2);
    expect(appId.id).toBe(2);
});