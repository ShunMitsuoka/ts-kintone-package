module.exports = {
    entry: './src',
    output: {
        filename: "index.js",
        library: 'ts-kintone-package',
        libraryTarget: 'umd'
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: 'ts-loader',
        },
      ],
    },
    resolve: {
      extensions: ['.ts', '.js'],
    },
  };