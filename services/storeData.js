"use strict";

var config = require("../config/config.js");
const request = require("request-promise");
const models = require("../models");

// ADD NEW RECORDS IN THE TABLE

exports.getVideoData = async () => {

  try {
      
  

    var options = {
        url: config.google.baseUrl+'part=snippet&maxResults=25&q=cricket&order=date&key='+config.google.key,
        method: 'GET',
        headers: {
        'Content-Type': 'application/json'
        }
    }
 
    let respObj =    await request(options, (error, response, body) => {
                        body = JSON.parse(body);
                        return body;
                    });

      respObj = JSON.parse(respObj);
      
      let dbObject = [];
     
      for(let ele = 0 ;ele < respObj.items.length;ele++){

        // CREATING DATABASE OBJECT 
        let obj = {};
        obj["videoId"] = (respObj.items[ele].id.videoId||'')+respObj.items[ele].snippet.channelId; // VIDEOID + CHANNLEID (In some cases videoId was null)
        obj["videoTitle"] = respObj.items[ele].snippet.title||'dummyTitle';
        obj["videoDescription"] = respObj.items[ele].snippet.description;
        obj["publishedTime"] = respObj.items[ele].snippet.publishTime;
        obj["thumbNails"] = respObj.items[ele].snippet.thumbnails;
        obj["meta"] = respObj.items[ele];

        let value = await checkInDatabase(obj["videoId"]);  //CHECKING IF THE VIDEODATA ALREADY EXISTED

        if(!value){
           dbObject.push(obj);    // PUSHING IN THE BULK CREATE LIST OTHERWISE
        }
       
  
      }
      addInDatabase(dbObject);   // BULK CREATING THE RECORDS


  }
  catch (error) {
  
  };
 } 

 // CHECKS IF THE VIDEODATA ALREADY EXISTS IN THE TABLE

 const checkInDatabase = async(videoId)=>{

     return  models.videoData.findOne({
        where:{videoId:videoId},
        raw:true
      }).then((result,error)=>{
        if(result && result.videoId)return 1;
        return 0;
      });

 }

 // BULK CREATE THE RECORDS
 const addInDatabase = async(data)=>{
  return  models.videoData.bulkCreate(data);
 }
