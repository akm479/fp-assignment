"use strict";

module.exports = function(sequelize, DataTypes) {
 var videoData = sequelize.define("videoData", {
   videoId : DataTypes.STRING,
   videoTitle : DataTypes.STRING,
   videoDescription : DataTypes.STRING,
   publishedTime: DataTypes.DATE,
   thumbNails : DataTypes.JSON,
   meta : DataTypes.JSON,
  }
  , {
   classMethods: {
     associate: function(models) {
     }
   },
   freezeTableName: true,
   timestamps: true
 });

 return videoData;
};
