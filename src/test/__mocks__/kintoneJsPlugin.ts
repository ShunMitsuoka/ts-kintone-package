import { AppId } from "../../kintone-packages/domain/models/KintoneApp/appId";

export const mockGetCurrentAppId = jest.fn(() => {
    return new AppId(100)
});
const KintoneJsPlugin = jest.fn().mockImplementation(() => {
  return {getCurrentAppId: mockGetCurrentAppId};
});

export default KintoneJsPlugin;