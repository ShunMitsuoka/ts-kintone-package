module.exports = {
    entry: './src',
    output: {
        filename: "index.js",
        library: 'TSKintone',
        libraryTarget: 'umd',
        globalObject: 'this',
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