module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'airbnb', 'airbnb/hooks'],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-var-requires': 'warn',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-non-null-assertion': 'warn',
    'prefer-const': 'warn',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-filename-extension': 'off',
    'import/no-unresolved': 'off',
    'react/require-default-props': 'off',
    'import/extensions': 'off',
    '@typescript-eslint/no-duplicate-enum-values': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    'no-param-reassign': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'no-shadow': 'warn',
    'react/prop-types': 'off',
    'no-useless-escape': 'off',
    'import/prefer-default-export': 'off',
    '@typescript-eslint/no-empty-object-type': 'warn',
    'react/jsx-no-constructed-context-values': 'warn',
    'no-undef': 'warn',
    'jsx-a11y/heading-has-content': 'warn',
  },
};
