const path = require('path');

module.exports = {
    // モード値を production に設定すると最適化された状態で、
    // development に設定するとソースマップ有効でJSファイルが出力される
    mode: 'development',
    // メインとなるJavaScriptファイル（エントリーポイント）
    entry: path.resolve('src/index.ts'),
    output: {
        path: path.resolve('dist'),
        filename: 'index.js',

    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
            },
        ],
    },
    // import 文で .ts ファイルを解決するため
    // これを定義しないと import 文で拡張子を書く必要が生まれる。
    // フロントエンドの開発では拡張子を省略することが多いので、
    // 記載したほうがトラブルに巻き込まれにくい。
    resolve: {
        extensions: ['.ts', '.js'],
        alias: {
            '@kintone-packages': path.resolve(__dirname, 'src/kintone-packages/'),
        },
    },
};