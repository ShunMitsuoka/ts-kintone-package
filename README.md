kintoneのプラグイン開発をより効率的に行えるようにするライブラリです

## kintone オブジェクト
当ライブラリには以下のようなオブジェクトが存在します。

|  オブジェクト  |  説明  |
| ---- | ---- |
|  KintoneApp  |  kintoneの１つのアプリ |
|  KintoneField  |  kintoneアプリの１つのフィールド |
|  KintoneFieldCode  |  kintoneアプリの１つのフィールドのフィールドコード |
|  KintoneFieldType  |  kintoneアプリの１つのフィールドのフィールドタイプ |
|  KintoneRecord  |  kintoneアプリの１レコード |

## 使用方法
本ライブラリの使用方法の例を下記に示します。
### 全kintoneアプリの情報取得
```
import { KintoneApp, KintoneAppRepository } from "ts-kintone-package";

const kintoneAppRepository = new KintoneAppRepository()
const apps : KintoneApp[] = await kintoneAppRepository.getAll();
```

### 自kintoneアプリの情報取得
```
import { KintoneApp, KintoneAppRepository } from "ts-kintone-package";

const kintoneAppRepository = new KintoneAppRepository()
const currentApp : KintoneApp = await kintoneAppRepository.getCurrentApp();
```

### 自kintoneアプリの全てのフィールドを取得
```
import { KintoneApp, KintoneAppRepository, KintoneField } from "ts-kintone-package";

const kintoneAppRepository = new KintoneAppRepository()
const currentApp : KintoneApp = await kintoneAppRepository.getCurrentApp();
const fields : Map<string, KintoneField> = currentApp.getFieldsMap();
```

### 自kintoneアプリのフィールド「フィールドコード1」のフィールドタイプを取得
```
import { KintoneApp, KintoneAppRepository } from "ts-kintone-package";

const kintoneAppRepository = new KintoneAppRepository()
const currentApp : KintoneApp = await kintoneAppRepository.getCurrentApp();
const fieldType = currentApp.getFields().getField('フィールドコード1').getFieldType();
```