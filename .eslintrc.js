module.exports = {
    "env": {
      "browser": true,
      "es2021": true
    },
    "extends": [
      "eslint:recommended",
      "plugin:react/recommended"
    ],
    "overrides": [
      {
        "env": {
          "node": true
        },
        "files": [
          ".eslintrc.{js,cjs}"
        ],
        "parserOptions": {
          "sourceType": "script"
        }
      }
    ],
    "parserOptions": {
      "ecmaVersion": "latest",
      "sourceType": "module"
    },
    "plugins": [
      "react"
    ],
    "settings": {
    "react": {
      "version": "16.8" // Spécifiez la version de React que vous utilisez
    }
  },
    "rules": {
      "react/version": 0// Ajoutez cette règle pour détecter automatiquement la version de React
    }
  }
  