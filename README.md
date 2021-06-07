# fampay-assignment

This is a NodeJs application. 
## Installation

#### Prerequisites
1) NodeJs should be installed
2) MySql should be installed

#### Steps to run

1) Git clone the repo
2) Run npm install
3) Enter the details of the local database where the table needs to be created and goolge api keys in the config file
```bash
project_folder/config/credentials/config.json
```
4) Run 
      ```bash 
      npm install 
     ```
5) Run 
     ```bash 
      node app
     ```



## Usage
The above steps will start a server at port 3000

1) #### Constantly pulling Data

```bash
project_folder/services/storeData.js
```
There is a cronjob that runs every minute and fetches the latest records and updates them in the table (videoData) in descending order of published datetime.
``` bash
For the  first time it fetches 25 records and later keeps on adding new records
```

2) #### APIs

  

   

```python
    1)  getPaginatedData API
            localhost:3000/search/getPaginatedVideoData

        req.body = {
                     pageSize : someNumber,
                     offset : someNumber
                   }

    2)  searchTitle API
            localhost:3000/search/title

         req.body = {
                     title : "hello"
                    }


    3)  searchDescription API
            localhost:3000/search/description

         req.body = {
                     description : "it has something"
                    }


    RESPONSE OF ALL THE APIs IS LIST OF VIDEODATA
```

## Alternative
   #### If require I can also expose ngrok url and apis can be tested on my system.
** Could have made a docker image and would have shared but due to lack of internet and time bandwidth was not able to download the docker and it's dependencies
