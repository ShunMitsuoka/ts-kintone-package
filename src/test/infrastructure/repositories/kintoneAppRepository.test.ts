import { KintoneAppRepository } from "../../../kintone-packages/infrastructure/repositories/kintoneAppRepository";
import { KintoneJsPlugin } from "../../../kintone-packages/infrastructure/externalapi/kintoneJsApi/kintoneJsPlugin";
jest.mock('../../../kintone-packages/infrastructure/externalapi/kintoneJsApi/kintoneJsPlugin');

let repository: KintoneAppRepository = new KintoneAppRepository();

test('getCurrentAppId', () => {
    expect(repository.getCurrentAppId().id).toBe(100);
});