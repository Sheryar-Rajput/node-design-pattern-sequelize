const { Sequelize, DataTypes } = require("sequelize");
const { dbConfig } = require("../config/config");
const fs = require("fs");
const path = require("path");
const modelPath = `${__dirname}/models`;
const db = {};

async function initializeDb() {
  const sequelize = new Sequelize(
    dbConfig.database,
    dbConfig.username,
    dbConfig.password,
    {
      host: dbConfig.host,
      dialect: dbConfig.dialect,
    }
  );

  // connection
  await sequelize.authenticate();
  // load schema models

  fs.readdirSync(modelPath)
    .filter((file) => {
      return (
        file.indexOf(".") !== 0 &&
        file.slice(-3) === ".js" &&
        file.indexOf(".test.js") === -1
      );
    })
    .forEach((file) => {
      const model = require(path.join(modelPath, file))(sequelize, DataTypes);
      db[model.name] = model;
    });

  Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

  db.sequelize = sequelize;
  db.Sequelize = Sequelize;
  return db;
}

module.exports = initializeDb;
