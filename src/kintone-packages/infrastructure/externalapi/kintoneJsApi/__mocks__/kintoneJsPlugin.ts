import { AppId } from "../../../../domain/models/KintoneApp/appId";

const mockGetCurrentAppId = jest.fn();
const mock = jest.fn().mockImplementation(() => {
  return {
    getCurrentAppId: () => {
      return new AppId(100)
    }
  }
});

// export class KintoneJsPlugin {
//   public static getCurrentAppId() : AppId{
//     return new AppId(100)
//   }
// }

export default mock;