// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var friends = require("../data/friends");



// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });


  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a reservation request... this data is then sent to the server...
  // Then the server saves the data to the tableData array)
  // ---------------------------------------------------------------------------

  app.post("/api/tables", function(req, res) {
    // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
    // It will do this by sending out the value "true" have a table
    // req.body is available since we're using the body-parser middleware
  
    
    var newFriend = req.body;
    var bestMatch = {
      name: "",
      photo: "",
      friendDifference: 1000
    }
    var totalDifference = 0;
    for(var i = 0; i < friends.length; i++){
      var currentFriend = friends[i];
      for(var j = 0; j < currentFriend.scores.length; j++){
        totalDifference = Math.abs(parseInt(newFriend.scores[j])-currentFriend.scores[j])
      }
      if(totalDifference <= bestMatch.friendDifference){
        bestMatch.name = currentFriend.name;
        bestMatch.photo = currentFriend.photo;
        bestMatch.friendDifference = totalDifference;
      }
    }
friends.push(newFriend);
res.json(bestMatch);
    //create loop of friends array data 
    //once in friends loop loop through answers
    //compare each friends answers to new friends answers 
    //math.abs to find wich friend is best for you or losest absolute score
    //push the new user data to friends array 
    //res.json data best matched

  });

  // ---------------------------------------------------------------------------
  // I added this below code so you could clear out the table while working with the functionality.
  // Don"t worry about it!


};
