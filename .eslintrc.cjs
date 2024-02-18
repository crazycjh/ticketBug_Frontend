/* eslint-env node */

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    // 'airbnb-base',
  ],
  rules: {
    // 禁止在語句末尾使用分號
    semi: [0],
    'comma-dangle': [0],
    'max-len': 'off',
    'no-trailing-spaces':['warn'],
    'no-multiple-empty-lines': ['warn', { max: 2 }],
    quotes: [0],
    indent: [0],
    "import/extensions": "off",
    'spaced-comment': "off",
    eqeqeq: "off",
    'no-unused-vars': "off",
    'no-dupe-keys': "off",
    'key-spacing': ['warn'],
    'eol-last': 'off',
    'vue/multi-word-component-names': 'off'
  },
  parserOptions: {
    ecmaVersion: 'latest',
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@', './src'],
        ],
        extensions: ['.js', '.vue'],
      },
    },
    'import/core-modules': [
      'vite',
      '@vitejs/plugin-vue',
    ],
  },
  
    "env": {
      "browser": true,
      "worker": true
    }
  
}
