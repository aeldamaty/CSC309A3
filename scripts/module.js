var tIndex = 0;
var uIndex = 0;
var lIndex = 0;
var tIndex2 = 0;
var uIndex2 = 0;
var lIndex2 = 0;

var responseObject;

$(document).ready(function(){
	$("#tPrev").hide();
	$("#tNext").hide();
	$("#uPrev").hide();
	$("#uNext").hide();
	$("#lPrev").hide();
	$("#lNext").hide();

	$('#allTweets').click(function(){
		$("#uPrev").hide();
		$("#uNext").hide();
		$("#lPrev").hide();
		$("#lNext").hide();
		$( "#results" ).empty();
		$( "#theURLS" ).empty();
		$.ajax('/getTweets', {
			success: function(response){
				tIndex = 0;
				tIndex2 = 0;
				responseObject = response;
				for(i=0; i < 5; i++){
					if(tIndex < response.length){
						$("#results").append("<div class=\"row\"> <span class=\"cell\"> <b>Created At : </b>" + response[tIndex].created_at + "</span> " + "<span class=\"cell\"> <b>Tweet ID : </b>" + response[tIndex].id + "</span> "  + "<span class=\"cell\"> <b>Tweet Text : </b>" + response[tIndex].text + "</div>");
					}
					if(tIndex % 5 == 0){
						$("#tNext").show();
						tIndex2 = tIndex - 5;
					}
					tIndex++;
				}

				/*$.each(response, function(i, tweet){
					$("#results").append("<div class=\"row\"> <span class=\"cell\"> <b>Created At : </b>" + tweet.created_at + "</span> " + "<span class=\"cell\"> <b>Tweet ID : </b>" + tweet.id + "</span> "  + "<span class=\"cell\"> <b>Tweet Text : </b>" + tweet.text + "</div>");
				});*/
			}
		});
	});
	$('#tNext').click(function(){
		if(tIndex >= responseObject.length)
			return;

		$( "#results" ).empty();
		$( "#theURLS" ).empty();
		
		for(i=0; i < 5; i++){
			if(tIndex < responseObject.length){
				$("#results").append("<div class=\"row\"> <span class=\"cell\"> <b>Created At : </b>" + responseObject[tIndex].created_at + "</span> " + "<span class=\"cell\"> <b>Tweet ID : </b>" + responseObject[tIndex].id + "</span> "  + "<span class=\"cell\"> <b>Tweet Text : </b>" + responseObject[tIndex].text + "</div>");
			}
			if(tIndex % 5 == 0){
				//$("#tNext").show();
				tIndex2 = tIndex - 5;
			}
			if(tIndex > 5){
				$("#tPrev").show();
			}
			tIndex++;
		}
		/*if(tIndex>=responseObject.length){
			$("#tNext").hide();
		}*/
	});
	$('#tPrev').click(function(){
		$( "#results" ).empty();
		$( "#theURLS" ).empty();

		tIndex = tIndex2;
		if(tIndex < 0)
			tIndex = 0;

		for(i=0; i < 5; i++){
			if(tIndex < responseObject.length){
				$("#results").append("<div class=\"row\"> <span class=\"cell\"> <b>Created At : </b>" + responseObject[tIndex].created_at + "</span> " + "<span class=\"cell\"> <b>Tweet ID : </b>" + responseObject[tIndex].id + "</span> "  + "<span class=\"cell\"> <b>Tweet Text : </b>" + responseObject[tIndex].text + "</div>");
			}
			if(tIndex % 5 == 0){
				//$("#tNext").show();
				tIndex2 = tIndex - 5;
			}
			if(tIndex > 5){
				$("#tPrev").show();
			}
			tIndex++;
		}
		if(tIndex>=responseObject.length){
			$("#tNext").hide();
		}
	});
	$('#allUsers').click(function(){
		$("#tPrev").hide();
		$("#tNext").hide();
		$("#lPrev").hide();
		$("#lNext").hide();
		$( "#results" ).empty();
		$( "#theURLS" ).empty();
		
		$.ajax('/getUsers', {
			success: function(response){
				uIndex = 0;
				uIndex2 = 0;
				responseObject = response;
				for(i=0; i < 5; i++){
					if(uIndex < response.length){
						$("#results").append("<div class=\"row\"> <span class=\"cell\"> <b>Name : </b>" + response[uIndex].name + "</span> " + "<span class=\"cell\"> <b>Screen name : </b>" + response[uIndex].screen_name + "</span> " + "</div>");
					}
					if(uIndex % 5 == 0){
						$("#uNext").show();
						uIndex2 = uIndex - 5;
					}
					uIndex++;
				}
				//console.log(response);
				//console.log(response[0]);
				/*$.each(response, function(i, user){
					$("#results").append("<div class=\"row\"> <span class=\"cell\"> <b>Name : </b>" + user.name + "</span> " + "<span class=\"cell\"> <b>Screen name : </b>" + user.screen_name + "</span> " + "</div>");
				});*/
			}
		});
	});
	$('#uNext').click(function(){
		if(uIndex >= responseObject.length)
			return;

		$( "#results" ).empty();
		$( "#theURLS" ).empty();
		
		for(i=0; i < 5; i++){
			if(uIndex < responseObject.length){
				$("#results").append("<div class=\"row\"> <span class=\"cell\"> <b>Name : </b>" + responseObject[uIndex].name + "</span> " + "<span class=\"cell\"> <b>Screen name : </b>" + responseObject[uIndex].screen_name + "</span> " + "</div>");
			}
			if(uIndex % 5 == 0){
				//$("#tNext").show();
				uIndex2 = uIndex - 5;
			}
			if(uIndex > 5){
				$("#uPrev").show();
			}
			uIndex++;
		}
		/*if(tIndex>=responseObject.length){
			$("#tNext").hide();
		}*/
	});
	$('#uPrev').click(function(){
		$( "#results" ).empty();
		$( "#theURLS" ).empty();

		uIndex = uIndex2;
		if(uIndex < 0)
			uIndex = 0;

		for(i=0; i < 5; i++){
			if(uIndex < responseObject.length){
				$("#results").append("<div class=\"row\"> <span class=\"cell\"> <b>Name : </b>" + responseObject[uIndex].name + "</span> " + "<span class=\"cell\"> <b>Screen name : </b>" + responseObject[uIndex].screen_name + "</span> " + "</div>");
			}
			if(uIndex % 5 == 0){
				//$("#tNext").show();
				uIndex2 = uIndex - 5;
			}
			if(uIndex > 5){
				$("#tPrev").show();
			}
			uIndex++;
		}
		if(uIndex>=responseObject.length){
			$("#tNext").hide();
		}
	});
	$('#allLinks').click(function(){
		$("#tPrev").hide();
		$("#tNext").hide();
		$("#uPrev").hide();
		$("#uNext").hide();
		$( "#results" ).empty();
		$( "#theURLS" ).empty();

		$.ajax('/allLinks', {
			success: function(response){
				lIndex = 0;
				lIndex2 = 0;
				responseObject = response;
				for(i=0; i < 2; i++){
					if(lIndex < response.length){
						$("#theURLS").append("<br> <b> Tweet ID: "+ response[lIndex].id+ "</b>" +"<br>");
						$.each(response[lIndex].theURLs, function(j, URL){
							$("#theURLS").append(URL.url+"<br>");
						});
					}
					if(lIndex % 2 == 0){
						$("#lNext").show();
						lIndex2 = lIndex - 2;
					}
					lIndex++;
				}
				/*$.each(response, function(i, tweet){
					$("#theURLS").append("<br> <b> Tweet ID: "+ tweet.id+ "</b>" +"<br>");
					$.each(tweet.theURLs, function(j, URL){
						$("#theURLS").append(URL.url+"<br>");
					});
				});*/
			}
		});
	});
	$('#lNext').click(function(){
		if(lIndex >= responseObject.length)
			return;

		$( "#results" ).empty();
		$( "#theURLS" ).empty();
		
		for(i=0; i < 2; i++){
			if(lIndex < responseObject.length){
				$("#theURLS").append("<br> <b> Tweet ID: "+ responseObject[lIndex].id+ "</b>" +"<br>");
				$.each(responseObject[lIndex].theURLs, function(j, URL){
					$("#theURLS").append(URL.url+"<br>");
				});
			}
			if(lIndex % 2 == 0){
				//$("#tNext").show();
				lIndex2 = lIndex - 2;
			}
			if(lIndex > 2){
				$("#lPrev").show();
			}
			lIndex++;
		}
		/*if(tIndex>=responseObject.length){
			$("#tNext").hide();
		}*/
	});
	$('#lPrev').click(function(){
		$( "#results" ).empty();
		$( "#theURLS" ).empty();

		lIndex = lIndex2;
		if(lIndex < 0)
			lIndex = 0;

		for(i=0; i < 3; i++){
			if(lIndex < responseObject.length){
				$("#theURLS").append("<br> <b> Tweet ID: "+ responseObject[lIndex].id+ "</b>" +"<br>");
				$.each(responseObject[lIndex].theURLs, function(j, URL){
					$("#theURLS").append(URL.url+"<br>");
				});
			}
			if(lIndex % 3 == 0){
				//$("#tNext").show();
				lIndex2 = lIndex - 3;
			}
			if(lIndex > 3){
				$("#lPrev").show();
			}
			lIndex++;
		}
		if(lIndex>=responseObject.length){
			$("#lNext").hide();
		}
	});
	$('#tweetDetails').click(function(){
		$("#tPrev").hide();
		$("#tNext").hide();
		$("#uPrev").hide();
		$("#uNext").hide();
		$("#lPrev").hide();
		$("#lNext").hide();
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
				if(response.length > 0 && response[0].error == "204")
					alert("Error 204. No Tweet with the id " + value + " found!");
				else if(response.length > 0)
					$("#results").append("<div class=\"row\"> <span class=\"cell\"> <b>Created on : </b>" + response[0].created_at + "</span> " +" <span class=\"cell\"> <b> Tweeter: </b>" + response[0].screen_name + "</span> " + " <span class=\"cell\"> <b>Tweet : </b>" + response[0].text + "</span>" + "</div>");
				else
					alert("No Tweet with the id " + value + " found!");
			}
		});
	});
	$('#profileInfo').click(function(){
		$("#tPrev").hide();
		$("#tNext").hide();
		$("#uPrev").hide();
		$("#uNext").hide();
		$("#lPrev").hide();
		$("#lNext").hide();
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
				if(response.length > 0 && response[0].error == "204")
					alert("Error 204. No User with the screen_name " + value + " found!");
				else if(response.length > 0)
					$("#results").append("<div class=\"row\"> <span class=\"cell\"> <b>Username : </b>" + response[0].screen_name + "</span> " +" <span class=\"cell\"> <b> Name: </b>" + response[0].name + "</span> " + " <span class=\"cell\"> <b>Location : </b>" + response[0].location + "</span>" + " <span class=\"cell\"> <b>Description : </b>" + response[0].description + "</span>" + " <span class=\"cell\"> <b>Following : </b>" + response[0].followers_count + "</span>" + " <span class=\"cell\"> <b>Friends : </b>" + response[0].friends_count + "</span>" + "</div>");
				else
					alert("No user with the screen name " + value + " found!");
			}
		});
	});
});