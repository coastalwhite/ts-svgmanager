const path = require('path')

module.exports = {
    entry: {
        test: './src/test.ts',
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.json'],
    },
    output: {
        path: path.resolve(__dirname, 'dist/js'),
        filename: '[name].bundle.js', // Hacky way to force webpack   to have multiple output folders vs multiple files per one path
    },

    module: {
        rules: [
            // all files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'
            { test: /\.tsx?$/, use: ['ts-loader'], exclude: /node_modules/ },
        ],
    },
}
