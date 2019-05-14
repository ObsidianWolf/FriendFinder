var path = require('path');


var friends = require('../data/friends.js');


module.exports = function(app) {
	


	app.get('/api/friends', function(req, res) {
		res.json(friends);
	});

	app.post('/api/friends', function(req, res) {
        var totalDifference = 0;
        var bestMatch = {
            name: "",
            photo: "",
            friendDiffrence:1000
        };
        var userData = req.body;
        var userName = userData.name;
        var userScores = userData.scores;

        var b = userScores.map(function(item){
            return parseInt(item, 10);
        });
        userData = {
            name: req.body.name,
            photo: req.body.photo,
            score: b
        };

        console.log("name: " + userName + '\n'
        + "User score " + userScores);

        var sum = b.reduce((a, b) => a + b, 0);
        console.log("Sum of the users score " + sum + '\n'
        + "Best match friend diff " + bestMatch.friendDiffrence + '\n'
        + "++++++++++++++=======================================");

        console.log(friends);
        for(var i = 0; i < friends.length; i++){
            console.log(friends[i].name);
            totalDifference = 0;
            console.log("Total Diff " + totalDifference + '\n'
            +"Best match friend diff " + bestMatch.friendDiffrence);

            var bfriendScore = friends[i].score.reduce((a, b) => a + b, 0);
            console.log("Total friend score " + bfriendScore);
            totalDifference += Math.abs(sum - bfriendScore);
            console.log("------------------------------> " + totalDifference);

            if(totalDifference <= bestMatch.friendDiffrence) {
                bestMatch.name = friends[i].name;
                bestMatch.photo = friends[i].photo;
                bestMatch.friendDiffrence = totalDifference;
            }
            console.log(totalDifference + " Total Difference");
        }

        //saving the users data to the database and return a json with the users best match
        console.log(bestMatch);
        friends.push(userData);
        console.log("New User added" + '\n' 
        + userData);
        res.json(bestMatch)
	});
};