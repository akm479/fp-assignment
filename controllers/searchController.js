"use strict";

const searchHandler = require("../handlers/searchHandler");

//Returns paginated data  it req.body should contains pageSize and offset fields

exports.getPaginatedVideoData = async (req, res, next) => {

  try {
      
    let respObj = await searchHandler.getPaginatedVideoData(req);
    
    if(respObj) {

      return res.end(JSON.stringify(respObj));

    }
    else {
      return res.end(JSON.stringify({"success":false}));
    }
   
  }
  catch (error) {
   
  };
 } 

// Return all the videoData which matches the search keyword by title
exports.searchTitle = async (req, res, next) => {
  try {
      
    let respObj = await searchHandler.searchTitle(req);

    if(respObj) {

      return res.end(JSON.stringify(respObj));

    }
    else {
      return res.end(JSON.stringify({"success":false}));
    }
   
  }
  catch (error) {
   
  };
 } 

// Return all the videoData which matches the search keyword by description
 exports.searchDescription = async (req, res, next) => {
  try {
      
    let respObj = await searchHandler.searchDescription(req);

    if(respObj) {

      return res.end(JSON.stringify(respObj));

    }
    else {
      return res.end(JSON.stringify({"success":false}));
    }
   
  }
  catch (error) {
   
  };
 } 