const { dbConfig } = require("../config/config");
module.exports = {
  development: {
    ...dbConfig,
  },
  production: {
    ...dbConfig,
  },
};
