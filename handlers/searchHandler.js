"use strict";

const request = require('request-promise');
const models = require("../models");
const {Op, fn, col, QueryTypes} = require("sequelize");


exports.getPaginatedVideoData = async (req) => {
  try {
   
      return await models.videoData.findAll({
        limit: req.body.pageSize,
        offset: (req.body.offset*req.body.pageSize),
        raw:true
      }).then((result,error)=>{
        console.log(result);
        if(result)return result;
        return [];
      });
   
  }
  catch (error) {

  };
}

exports.searchTitle = async (req) => {
  try {
      return await models.videoData.findAll({
        where:{
          videoTitle:{
            [Op.like]: '%' + req.body.title + '%'
          }
        },
        raw:true
      }).then((result,error)=>{
        console.log(result);
        if(result)return result;
        return [];
      });
  
  }
  catch (error) {
   
  };
}

exports.searchDescription = async (req) => {
  try {
      return await models.videoData.findAll({
        where:{
          videoDescription:{
                [Op.like]: '%' + req.body.description + '%'
            }
        },
        raw:true
      }).then((result,error)=>{
        console.log(result);
        if(result)return result;
        return [];
      });
  
  }
  catch (error) {
   
  };
}


