module.exports = {
  extends: ['prettier'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  env: {
    jest: true,
  },
  rules: {
    'no-use-before-define': 'off',
    'react/jsx-filename-extension': 'off',
    'react/prop-types': 'off',
    'comma-dangle': 'off',
    'import/no-extraneous-dependencies': 'off',
    'default-case': 'off',
    'import/prefer-default-export': 'off',
    'no-console': 'off',
    'react/forbid-prop-types': 'off',
    'react/require-default-props': 'off',
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    'no-plusplus': 'off',
    'jsx-a11y/accessible-emoji': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    camelcase: 'warn',
    'max-len': [
      'error',
      {
        code: 150,
      },
    ],
    'react/jsx-closing-tag-location': 'off',
    'react/jsx-closing-bracket-location': 'off',
    'react/jsx-indent': 'off',
    'react/default-props-match-prop-types': 'off',
  },
  globals: {
    fetch: false,
  },
};
