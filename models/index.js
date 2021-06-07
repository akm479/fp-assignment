"use strict";

let fs        = require("fs");
let path      = require("path");
let Sequelize = require("sequelize");
let config    = require("../config/config.js").db;
let sequelize = new Sequelize(config);

let db        = {};

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf(".") !== 0) && (file !== "index.js");
  })
  .forEach(function(file) {
    let model = sequelize["import"](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if ("associate" in db[modelName]) { db[modelName].associate(db); }
});

sequelize.sync().then( d => {}, err => {console.log(err);});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
