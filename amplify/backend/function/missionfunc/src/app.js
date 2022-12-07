/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/




const express = require('express')
const bodyParser = require('body-parser')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')

// declare a new express app
const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});
const AWS = require('aws-sdk')
const dynamodb = new AWS.DynamoDB.DocumentClient()
const DataTableName = 'DataItem'
const AlgoTableName = 'AlgoItem'

/**********************
 * Example get method *
 **********************/
 app.get('/mission', function(req, res) {
  // Add your code here
  console.log("mission get");
  res.json({success: 'get call succeed!', url: req.url});
});

app.get('/mission/selection', function(req, res) {
  // Add your code here
  // console.log("selection get");
  // const DataTableName = 'DataItem'
  // const AlgoTableName = 'AlgoItem'
  // var params = {
  //     TableName: DataTableName
  // };
  // var params1 = {
  //     TableName: AlgoTableName
  // };
  // var myData = new Array();
  // var count = 0;
  // function onScan(err, data) {
  //   if (err) {
  //       console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
  //   } else {        
  //       console.log("Scan succeeded.");
  //       data.Items.forEach(function(itemdata) {
  //          console.log("Item :", ++count,JSON.stringify(itemdata));
  //          myData.push(itemdata.DataName);
  //       });

  //       // continue scanning if we have more items
  //       if (typeof data.LastEvaluatedKey != "undefined") {
  //           console.log("Scanning for more...");
  //           params.ExclusiveStartKey = data.LastEvaluatedKey;
  //           dynamodb.scan(params, onScan);
  //       }
  //   }
  // }
  // dynamodb.scan(params1, onScan);

  // res.json({success: 'get call succeed!', url: req.url, body: JSON.stringify(myData)});
});

/****************************
* Example post method *
****************************/

app.post('/mission', function(req, res) {
  // Add your code here
  console.log(req)

  var params = {
    TableName: DataTableName,
    Item:{
      DataName: req.body.DataID,
      DataPath: req.body.DataPath
    }
  }
  var params1 = {
    TableName: AlgoTableName,
    Item:{
      AlgoName: req.body.AlgoID,
      AlgoPath: req.body.AlgoPath
    }
  }
  var err1 = dynamodb.put(params)
  console.log("123456")
  console.log(err1)
  var err2 = dynamodb.put(params1)
  console.log(err2)
  err1.send()
  err2.send(function(err, data){
    if(err) res.json({err})
    else res.json({success: 'Item Inserted success'})
  })
});


app.post('/mission/selection', function(req, res) {
  // Add your code here
  console.log(req)

  var queryInfo = {
    Item:{
      DataName: req.body.DataID,
      AlgoName: req.body.AlgoID,
      Email:    req.body.Email
    }
  }
  //目录
  //scr.py algosrc, datasrc,email
  //
  var Datapath;
  var Algopath;
  var Dataquery = {
    TableName: DataTableName,
    Key:{
      'DataName': req.body.DataID
    }
  }
  console.log("----00000------");
  dynamodb.get(Dataquery, function(err, data){
    if(err){
      console.log("Data Get ERROR", err);
    }
    else{
      console.log("Data Get Success", data.Item);
      Datapath = data.Item;
    }
  });
  dynamodb.get(Dataquery).promise().then(data => console.log(data.Item)).catch(console.error)
  console.log("----123------");
  console.log(Datapath);
  console.log("selection get");
  console.log(queryInfo.Item.DataName);
  console.log(queryInfo.Item.AlgoName);
  console.log(queryInfo.Item.Email);
  var test = dynamodb.get(Dataquery);
  test.send(function(err, data){
    if(err) res.json({err})
    else{
      Datapath = data.Item;
      res.json({success: 'Item Get success'})
      console.log(Datapath);
    } 
  })


  console.log("finisheds ");
});



app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app