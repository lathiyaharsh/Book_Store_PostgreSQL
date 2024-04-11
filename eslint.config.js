module.exports = [
  {
      "files": ["**/*.js"],
      "languageOptions": {
          "parserOptions": {
              "ecmaVersion": 2018
          },
          "globals": {
              "node": true,
              "es6": true
          }
      },
      "rules": {
          // Possible rules to consider:
          "indent": ["error", 4], // Specify indentation (e.g., 4 spaces)
          "linebreak-style": ["error", "unix"], // Specify Unix line endings
          "quotes": ["error", "single"], // Specify single quotes
          "semi": ["error", "always"], // Require semicolons at the end of statements
          "no-console": "off", // Allow console.log() and other console methods
          "no-unused-vars": "warn" // Warn about unused variables
          // You can add more rules as needed
      }
  }
];
