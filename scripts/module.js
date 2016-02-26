$(document).ready(function(){
	$('#allTweets').click(function(){
		$.getJSON("./scripts/favs.json", function(result){
			$.each(result, function(i, tweet){
				$("#results").append(tweet.id + " ");
			});
		});
	});
	$('#allUsers').click(function(){
		$( "#results" ).empty();
		$( "#theURLS" ).empty();
		$.getJSON("./scripts/favs.json", function(result){
			
			var theUsers = [];

			$.each(result, function(i, tweet){
				if(theUsers[tweet.user.id]==null){
        			theUsers[tweet.user.id]=tweet.user.screen_name;

            		$("#results").append("<div class=\"row\"> <span class=\"cell\"> <b>Name : </b>" + tweet.user.name + "</span> " + "<span class=\"cell\"> <b>Screen name : </b>" + tweet.user.screen_name + "</span> " + "</div>");
            	}
            	
				$.each(tweet.entities.user_mentions, function(j, the_user_mentions){
					if(theUsers[the_user_mentions.id]==null){

            			theUsers[the_user_mentions.id]=the_user_mentions.screen_name;

                		$("#results").append("<div class=\"row\"> <span class=\"cell\"> <b>Name : </b>" + the_user_mentions.name + "</span> " + "<span class=\"cell\"> <b>Screen name : </b>" + the_user_mentions.screen_name + "</span> " + "</div>");
                	}
				});

			});
		});
	});
	$('#allLinks').click(function(){
		$( "#results" ).empty();
		$( "#theURLS" ).empty();
		$.getJSON("./scripts/favs.json", function(result){
			$.each(result, function(i, tweet){
				$("#theURLS").append("<br> <b> Tweet ID: "+ tweet.id+ "</b>" +"<br>");
				var info = JSON.stringify(tweet);

				var patt = new RegExp(/(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/igm);

				var test;

				while(( test = patt.exec(info) ) != null){
	        		$("#theURLS").append(test+"<br>");
	        	}
			});
		});
	});
	$('#tweetDetails').click(function(){
		$( "#results" ).empty();
		$( "#theURLS" ).empty();
		$.getJSON("./scripts/favs.json", function(result){
			
			var value = $("#tweetID").val();

        	if(value==""){
	        	alert("Field is empty");
	        	return;
	        }

	        var found = false;

			$.each(result, function(i, tweet){
				if(value==tweet.id){

        			found=true;

        			$("#table").append("<div class=\"row\"> <span class=\"cell\"> <b>Created on : </b>" + result[i].created_at + "</span> " +" <span class=\"cell\"> <b> Tweeter: </b>" + result[i].user.screen_name + "</span> " + " <span class=\"cell\"> <b>Tweet : </b>" + result[i].text + "</span>" + "</div>");
        		}
			});
			if(!found)
        		alert("Sorry, Tweet ID not found");
		});
	});
	$('#profileInfo').click(function(){
		$( "#results" ).empty();
		$( "#theURLS" ).empty();
		$.getJSON("./scripts/favs.json", function(result){
			$.each(result, function(i, tweet){
				$("#results").append(tweet.id + " ");
			});
		});
	});
});