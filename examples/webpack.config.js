const path = require('path')

module.exports = {
    entry: {
        example1: './src/README/example1.ts',
        example2: './src/README/example2.ts',
        example3: './src/README/example3.ts',
        example4: './src/README/example4.ts',
        example5: './src/README/example5.ts',
        example6: './src/README/example6.ts',
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
