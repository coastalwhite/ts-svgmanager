const path = require('path')

module.exports = {
    entry: {
        example1: './src/example1.ts',
        example2: './src/example2.ts',
        example3: './src/example3.ts',
        example4: './src/example4.ts',
        example5: './src/example5.ts',
        example6: './src/example6.ts',
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
