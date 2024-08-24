import eslintPluginPrettier from 'eslint-plugin-prettier'
import tseslint from 'typescript-eslint'
import pluginJs from '@eslint/js'
import globals from 'globals'

export default [
  ...tseslint.configs.recommended,
  pluginJs.configs.recommended,
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    ignores: ['node_modules', 'dist', '*.min.js'],
    languageOptions: { globals: globals.browser },
    plugins: {
      prettier: eslintPluginPrettier
    },
    rules: {
      semi: ['error', 'never'],
      quotes: [
        'error',
        'single',
        { avoidEscape: true, allowTemplateLiterals: true }
      ],

      'no-useless-return': 'error',
      'prettier/prettier': ['error']
    }
  }
]
