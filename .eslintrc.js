module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'unused-imports'],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    parserOptions: {
        tsconfigRootDir: __dirname,
        project: './tsconfig.json',
    },
    rules: {
        '@typescript-eslint/array-type': 'error',
        '@typescript-eslint/consistent-type-definitions': 'error',
        '@typescript-eslint/explicit-function-return-type': 'error',
        'prefer-const': 'error',
        'no-extra-semi': 'error',
        'no-console': 'warn',
        'no-alert': 'error',
        'no-unreachable': 'error',
        eqeqeq: 'error',
        'no-unused-vars': 'off',
        'unused-imports/no-unused-imports': 'error',
        'unused-imports/no-unused-vars': [
            'warn',
            {
                vars: 'all',
                varsIgnorePattern: '^_',
                args: 'after-used',
                argsIgnorePattern: '^_',
            },
        ],
        'comma-dangle': [
            'error',
            {
                arrays: 'always-multiline',
                objects: 'always-multiline',
                imports: 'always-multiline',
                exports: 'always-multiline',
                functions: 'always-multiline',
            },
        ],
    },
}
