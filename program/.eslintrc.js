module.exports = {
    root: true,
    ignorePatterns: ['node_modules', 'out', 'public'],
    env: { browser: true, es6: true, node: true },
    extends: [
        'eslint:recommended',
        'plugin:prettier/recommended',
        'plugin:import/errors',
    ],
    plugins: ['import'],
    rules: {
        'import/first': 'error',
        'import/no-cycle': 'error',
        'import/no-deprecated': 'error',
        'import/no-duplicates': 'error',
        'import/no-mutable-exports': 'error',
        'import/no-named-as-default': 'error',
        'import/no-named-as-default-member': 'error',
        'import/no-unassigned-import': [
            'error',
            {
                allow: [
                    'firebase/auth',
                    'firebase/firestore',
                    'firebase/storage',
                    'tailwindcss/tailwind.css',
                ],
            },
        ],
        'import/no-useless-path-segments': ['error', { noUselessIndex: true }],
        'import/order': 'error',
    },
    overrides: [
        {
            files: ['**/*.ts', '**/*.tsx'],
            parser: '@typescript-eslint/parser',
            parserOptions: {
                sourceType: 'module',
                tsconfigRootDir: __dirname,
                project: './tsconfig.json',
            },
            plugins: ['@typescript-eslint', 'deprecation'],
            extends: [
                'plugin:@typescript-eslint/recommended',
                'plugin:@typescript-eslint/recommended-requiring-type-checking',
                'prettier/@typescript-eslint',
                'plugin:import/typescript',
                'plugin:jsx-a11y/recommended',
                'plugin:react/recommended',
                'plugin:react-hooks/recommended',
            ],
            settings: {
                react: {
                    version: 'detect',
                },
            },
            rules: {
                'deprecation/deprecation': 'error',
                // HACK: https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/issues/402
                'jsx-a11y/anchor-is-valid': [
                    'error',
                    {
                        components: ['Link'],
                        specialLink: ['hrefLeft', 'hrefRight'],
                        aspects: ['invalidHref', 'preferButton'],
                    },
                ],
                'react/prop-types': 'off',
            },
        },
    ],
};
