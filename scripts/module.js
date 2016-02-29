$(document).ready(function(){
	$('#allTweets').click(function(){
		$( "#results" ).empty();
		$( "#theURLS" ).empty();
		$.ajax('/getTweets', {
			success: function(response){
				$.each(response.theIDS, function(i, tweet){
					$("#results").append("<div class=\"row\"> <span class=\"cell\"> <b>Created At : </b>" + tweet.created_at + "</span> " + "<span class=\"cell\"> <b>Tweet ID : </b>" + tweet.id + "</span> "  + "<span class=\"cell\"> <b>Tweet Text : </b>" + tweet.text + "</div>");
				});
			}
		});
	});
	$('#allUsers').click(function(){
		$( "#results" ).empty();
		$( "#theURLS" ).empty();
		
		$.ajax('/getUsers', {
			success: function(response){
				$.each(response.theUsers, function(i, user){
					$("#results").append("<div class=\"row\"> <span class=\"cell\"> <b>Name : </b>" + user.name + "</span> " + "<span class=\"cell\"> <b>Screen name : </b>" + user.screen_name + "</span> " + "</div>");
				});
			}
		});
	});
	$('#allLinks').click(function(){
		$( "#results" ).empty();
		$( "#theURLS" ).empty();

		$.ajax('/allLinks', {
			success: function(response){
				$.each(response.theLinks, function(i, tweet){
					$("#theURLS").append("<br> <b> Tweet ID: "+ tweet.id+ "</b>" +"<br>");
					$.each(tweet.theURLs, function(j, URL){
						$("#theURLS").append(URL.url+"<br>");
					});
				});
			}
		});
	});
	$('#tweetDetails').click(function(){
		$( "#results" ).empty();
		$( "#theURLS" ).empty();
		var value = $("#tweetID").val();

    	if(value==""){
        	alert("Field is empty");
        	return;
        }

        $.ajax('/getTweets', {
			data: { "tweetid":value },
			success: function(response){
				if(response.theIDS.length > 0)
					$("#results").append("<div class=\"row\"> <span class=\"cell\"> <b>Created on : </b>" + response.theIDS[0].created_at + "</span> " +" <span class=\"cell\"> <b> Tweeter: </b>" + response.theIDS[0].screen_name + "</span> " + " <span class=\"cell\"> <b>Tweet : </b>" + response.theIDS[0].text + "</span>" + "</div>");
				else
					alert("No Tweet with the id " + value + " found!");
			}
		});
	});
	$('#profileInfo').click(function(){
		$( "#results" ).empty();
		$( "#theURLS" ).empty();

		var value = $("#userName").val();

        if(value==""){

        	alert("Field is empty");
        	return;
        }

        $.ajax('/getUsers', {
			data: { "userid":value },
			success: function(response){
				if(response.theUsers.length > 0)
					$("#results").append("<div class=\"row\"> <span class=\"cell\"> <b>Username : </b>" + response.theUsers[0].screen_name + "</span> " +" <span class=\"cell\"> <b> Name: </b>" + response.theUsers[0].name + "</span> " + " <span class=\"cell\"> <b>Location : </b>" + response.theUsers[0].location + "</span>" + " <span class=\"cell\"> <b>Description : </b>" + response.theUsers[0].description + "</span>" + " <span class=\"cell\"> <b>Following : </b>" + response.theUsers[0].followers_count + "</span>" + " <span class=\"cell\"> <b>Friends : </b>" + response.theUsers[0].friends_count + "</span>" + "</div>");
				else
					alert("No user with the screen name " + value + " found!");
			}
		});
	});
});