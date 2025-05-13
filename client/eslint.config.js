import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import importPlugin from 'eslint-plugin-import'

export default [
  { ignores: ['dist'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      import: importPlugin,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      // React Hooks Rules
      'react-hooks/rules-of-hooks': 'error',  // Ensures hooks are used only in function components or custom hooks
      'react-hooks/exhaustive-deps': 'warn',  // Enforces proper hook dependencies

      // Import Plugin Rules
      'import/no-unresolved': 'error',  // Ensures imports are valid
      'import/named': 'error',  // Ensures named imports are correct
      'import/default': 'error',  // Ensures default imports are correct
      'import/namespace': 'error',  // Ensures namespace imports are correct
      'import/no-extraneous-dependencies': 'error',  // Avoids unnecessary package imports

      // Optional: Turn off specific rules for test files
      overrides: [
        {
          files: ['**/*.test.js', '**/*.test.jsx'],
          rules: {
            'no-unused-vars': 'off',  // Turn off unused vars rule for test files
          },
        },
      ],
    },
  },
]
