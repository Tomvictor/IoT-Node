
var mqtt = require('mqtt')
var options = {
	port:8883
}
var client  = mqtt.connect('mqtt://yourmqtt.com',options)
 
client.on('connect', function () {
  client.subscribe('technorip/iot')
  client.publish('technorip/iot', 'Hello mqtt')
})
 
client.on('message', function (topic, message) {
  
  switch(topic){
  case 'technorip/iot':
  return storeData(message)

  }  
  
})



var MongoClient = require('mongodb').MongoClient
 , assert = require('assert');

// Connection URL
var url = 'mongodb://username:password@ds139438.mlab.com:39438/mqmongo';



//write all the mongo db code here
function storeData(message){
//console.log(message);

// Use connect method to connect to the Server
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server");

  // Insert a single document
  db.collection('sensordata').insertOne({value1:message.toString()}, function(err, r) {
    assert.equal(null, err);
    assert.equal(1, r.insertedCount);
    db.close();
  });
  
});


}



