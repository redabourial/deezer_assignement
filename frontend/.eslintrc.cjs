module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'plugin:prettier/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  globals: {
    api: 'readonly',
  },
  ignorePatterns: [
    'dist',
    '.eslintrc.cjs',
    'coverage/*',
    'babel.config.js',
    'jest.config.js',
    'setupTests.js',
  ],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: [
    'react-refresh',
    'simple-import-sort',
    "prettier",
  ],
  rules: {
    'react/jsx-no-target-blank': 'off',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    "no-unused-vars": [
      "error",
      {
        "varsIgnorePattern": "React|_",
      }
    ],
    "prettier/prettier": "error",
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "import/no-absolute-path": "off",
    "no-multiple-empty-lines": "error",
    "semi": ["error", "always"],
    "brace-style": ["error", "1tbs", { "allowSingleLine": false }],
  },
  overrides: [
    {
      files: [
        "**/*.test.js",
        "**/*.test.jsx",
      ],
      env: {
        jest: true,
      }
    },
    {
      "files": ["*.js", "*.jsx", "*.ts", "*.tsx"],
      "rules": {
        "simple-import-sort/imports": [
          "error",
          {
            "groups": [
              // Packages `react` related packages come first.
              ["^react"],
              // Antd.
              ["^antd"],
              // Absolute imports.
              ["^[^.]"],
              // Internal packages.
              ["^(@|components)(/.*|$)"],
              // Side effect imports.
              ["^\\u0000"],
              // Parent imports. Put `..` last.
              ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
              // Other relative imports. Put same-folder imports and `.` last.
              ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
              // Style imports.
              ["^.+\\.?(css)$"],
            ]
          }
        ]
      }
    },
  ],
}
