var express = require('express');
var router = express.Router();
const searchController = require("../controllers/searchController");


// ROUTING FOR APIs

router.get('/getPaginatedVideoData', searchController.getPaginatedVideoData);  
router.get('/title', searchController.searchTitle);
router.get('/description', searchController.searchDescription);

module.exports = router;