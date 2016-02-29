var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');
var obj;

function addslashes(string) {
    return string.replace(/\\/g, '\\\\').
        replace(/\u0008/g, '\\b').
        replace(/\t/g, '\\t').
        replace(/\n/g, '\\n').
        replace(/\f/g, '\\f').
        replace(/\r/g, '\\r').
        /*replace(/'/g, '\\\'').*/
        replace(/"/g, '\\"');
}

http.createServer(function (request, response) {
    //console.log('request starting...');

    //var obj;
    fs.readFile('favs.json', function (err, data) {
      //if (err) throw err;
      obj = JSON.parse(data, 'utf-8');
      //console.log(obj[0].id);
    });

    //console.log(obj[0].id);

    var theRequestedURL = url.parse(request.url, true);
    //console.log(theRequestedURL.pathname);
    var extname = path.extname(theRequestedURL.pathname);
    var contentType = 'text/html';
    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;      
        case '.jpg':
            contentType = 'image/jpg';
            break;
        case '.wav':
            contentType = 'audio/wav';
            break;
    }

    switch(theRequestedURL.pathname){
        case "/index.html":
            console.log("here");
            fs.readFile("../index.html", function(error, content) {
                if (error) {
                    if(error.code == 'ENOENT'){
                        fs.readFile('./404.html', function(error, content) {
                            response.writeHead(200, { 'Content-Type': contentType });
                            response.end(content, 'utf-8');
                        });
                    }
                    else {
                        response.writeHead(500);
                        response.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
                        response.end(); 
                    }
                }
                else {
                    response.writeHead(200, { 'Content-Type': contentType });
                    response.end(content, 'utf-8');
                }
            });
            break;

        case "/getTweets":
            if(theRequestedURL.search.length > 1){
                var lookFor = theRequestedURL.query.tweetid;
                var text = '{ "theIDS" : [';
                for(i=0; i<obj.length; i++){
                    if(lookFor==obj[i].id){
                        text+= '{ "created_at":"' + obj[i].created_at + '" , "screen_name":"' + obj[i].user.screen_name  + '" , "text":"' + addslashes(obj[i].text) + '" }';
                        break;
                    }
                }
                text+=' ]}';
                var obj1 = JSON.parse(text);
                response.setHeader('Content-Type', 'application/json');
                response.write(JSON.stringify(obj1, null, 3));
                response.end();
            }
            else{
                var text = '{ "theIDS" : [';
                text+= '{ "created_at":"' + obj[0].created_at + '" , "id":"' + obj[0].id  + '" , "text":"' + addslashes(obj[0].text) + '" }';
                for(i=1; i<obj.length; i++){
                    text+= ',{ "created_at":"' + obj[i].created_at + '" , "id":"' + obj[i].id + '" , "text":"' + addslashes(obj[i].text)   + '" }';
                }
                text+=' ]}';    
                var obj1 = JSON.parse(text);
                response.setHeader('Content-Type', 'application/json');
                response.write(JSON.stringify(obj1, null, 3));
                response.end();
            }
            break;

        case "/getUsers":
            if(theRequestedURL.search.length > 1){
                var lookFor = theRequestedURL.query.userid;
                var found = false;
                var text = '{ "theUsers" : [';
                for(i=0; i<obj.length && !found; i++){
                    if(lookFor == obj[i].user.screen_name){
                        text+= '{ "screen_name":"' + obj[i].user.screen_name + '" , "name":"' + obj[i].user.name + '" , "location":"' + obj[i].user.location + '" , "description":"' + obj[i].user.description + '" , "followers_count":"' + obj[i].user.followers_count + '" , "friends_count":"' + obj[i].user.friends_count + '" }';
                        break;
                    }

                    for(j=0; j < obj[i].entities.user_mentions.length; j++){
                        if(lookFor == obj[i].entities.user_mentions[j].screen_name){
                            text+= '{ "screen_name":"' + obj[i].entities.user_mentions[j].screen_name + '" , "name":"' + obj[i].entities.user_mentions[j].name + '" , "location":"' + obj[i].entities.user_mentions[j].location + '" , "description":"' + obj[i].entities.user_mentions[j].description + '" , "followers_count":"' + obj[i].entities.user_mentions[j].followers_count + '" , "friends_count":"' + obj[i].entities.user_mentions[j].friends_count + '" }';
                            found = true;
                            break;
                        }
                    }
                }
                text+=' ]}';    
                var obj1 = JSON.parse(text);
                response.setHeader('Content-Type', 'application/json');
                response.write(JSON.stringify(obj1, null, 3));
                response.end();
            }
            else{
                var theUsers = [];
                var text = '{ "theUsers" : [';
                for(i=0; i<obj.length; i++){
                    if(theUsers[obj[i].user.id]==null){
                        theUsers[obj[i].user.id]=obj[i].user.screen_name;
                        if(i == 0){
                            text+= '{ "name":"' + obj[i].user.name + '" , "screen_name":"' + obj[i].user.screen_name + '" }';
                        }
                        else{
                            text+= ',{ "name":"' + obj[i].user.name + '" , "screen_name":"' + obj[i].user.screen_name  + '" }';
                        }
                        
                    }
                    
                    for(j=0; j < obj[i].entities.user_mentions.length; j++){
                        if(theUsers[obj[i].entities.user_mentions[j]]==null){

                            theUsers[obj[i].entities.user_mentions[j]]=obj[i].entities.user_mentions[j].screen_name;
                            text+= ',{ "name":"' + obj[i].entities.user_mentions[j].name + '" , "screen_name":"' + obj[i].entities.user_mentions[j].screen_name  + '" }';

                            
                        }
                    }

                }
                
                text+=' ]}';    
                var obj1 = JSON.parse(text);
                response.setHeader('Content-Type', 'application/json');
                response.write(JSON.stringify(obj1, null, 3));
                response.end();
            }
            break;

        case "/allLinks":
            var text = '{ "theLinks" : [';
            for(i=0; i<obj.length; i++){
                
                if(i == 0){
                    text+= '{ "id":"' + obj[i].id + '" , "theURLs" : [';
                }
                else{
                    text+= ',{ "id":"' + obj[i].id + '" , "theURLs" : [';
                }

                var help = JSON.stringify(obj[i]);
                var patt = new RegExp(/(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/igm);
                var test;
                var j = 0;
                while(( test = patt.exec(help) ) != null){
                    //console.log("ere" + j);
                    if(j == 0){
                        text+= '{ "url":"' + test + '" }';
                    }
                    else{
                        text+= ',{ "url":"' + test + '" }';
                    }
                    j++;
                }
                text+=' ]}';
                
            }
            text+=' ]}';
            var obj1 = JSON.parse(text);
            response.setHeader('Content-Type', 'application/json');
            response.write(JSON.stringify(obj1, null, 3));
            response.end();
            break;

        default:
            var toRead = ".." + theRequestedURL.pathname;
            if(toRead == '../')
                toRead = "../index.html";
            fs.readFile(toRead, function(error, content) {
            if (error) {
                if(error.code == 'ENOENT'){
                    fs.readFile('./404.html', function(error, content) {
                        response.writeHead(200, { 'Content-Type': contentType });
                        response.end(content, 'utf-8');
                    });
                }
                else {
                    response.writeHead(500);
                    response.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
                    response.end(); 
                }
            }
            else {
                response.writeHead(200, { 'Content-Type': contentType });
                response.end(content, 'utf-8');
            }
        });
    }




/************************************************************************************************************************************/


/*
    var filePath = '..' + request.url;
    if (filePath == '../')//favicon.ico
        filePath = '../index.html';
    console.log(filePath);
    var extname = path.extname(filePath);
    var contentType = 'text/html';
    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;      
        case '.jpg':
            contentType = 'image/jpg';
            break;
        case '.wav':
            contentType = 'audio/wav';
            break;
    }

    if (filePath == '../index.html'){
        fs.readFile(filePath, function(error, content) {
            if (error) {
                if(error.code == 'ENOENT'){
                    fs.readFile('./404.html', function(error, content) {
                        response.writeHead(200, { 'Content-Type': contentType });
                        response.end(content, 'utf-8');
                    });
                }
                else {
                    response.writeHead(500);
                    response.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
                    response.end(); 
                }
            }
            else {
                response.writeHead(200, { 'Content-Type': contentType });
                response.end(content, 'utf-8');
            }
        });
    }
    else if(request.url == '/getTweets'){
        console.log("yooooooooooooooooooooooooooooooooo");
        var text = '{ "theIDS" : [';
        text+= '{ "created_at":"' + obj[0].created_at + '" , "id":"' + obj[0].id  + '" , "text":"' + addslashes(obj[0].text) + '" }';
        console.log(obj[0].id)
        for(i=1; i<obj.length; i++){
            text+= ',{ "created_at":"' + obj[i].created_at + '" , "id":"' + obj[i].id + '" , "text":"' + addslashes(obj[i].text)   + '" }';
            //console.log(text);
            console.log(obj[i].id)
        }
        text+=' ]}';    
        var obj1 = JSON.parse(text);
        response.setHeader('Content-Type', 'application/json');
        response.write(JSON.stringify(obj1, null, 3));
        //response.write(JSON.stringify({ a: 1 }, null, 3));
        response.end();
    }
    else if(request.url == '/allUsers'){
        var theUsers = [];
        var text = '{ "theUsers" : [';
        for(i=0; i<obj.length; i++){
            if(theUsers[obj[i].user.id]==null){
                theUsers[obj[i].user.id]=obj[i].user.screen_name;
                if(i == 0){
                    text+= '{ "name":"' + obj[i].user.name + '" , "screen_name":"' + obj[i].user.screen_name + '" }';
                }
                else{
                    text+= ',{ "name":"' + obj[i].user.name + '" , "screen_name":"' + obj[i].user.screen_name  + '" }';
                }
                //$("#results").append("<div class=\"row\"> <span class=\"cell\"> <b>Name : </b>" + tweet.user.name + "</span> " + "<span class=\"cell\"> <b>Screen name : </b>" + tweet.user.screen_name + "</span> " + "</div>");
            }
            
            for(j=0; j < obj[i].entities.user_mentions.length; j++){
                if(theUsers[obj[i].entities.user_mentions[j]]==null){

                    theUsers[obj[i].entities.user_mentions[j]]=obj[i].entities.user_mentions[j].screen_name;
                    text+= ',{ "name":"' + obj[i].entities.user_mentions[j].name + '" , "screen_name":"' + obj[i].entities.user_mentions[j].screen_name  + '" }';

                    //$("#results").append("<div class=\"row\"> <span class=\"cell\"> <b>Name : </b>" + the_user_mentions.name + "</span> " + "<span class=\"cell\"> <b>Screen name : </b>" + the_user_mentions.screen_name + "</span> " + "</div>");
                }
            }

        }
        
        text+=' ]}';    
        var obj1 = JSON.parse(text);
        response.setHeader('Content-Type', 'application/json');
        response.write(JSON.stringify(obj1, null, 3));
        //response.write(JSON.stringify({ a: 1 }, null, 3));
        response.end();
    }
    else if(request.url == '/allLinks'){
        
        var text = '{ "theLinks" : [';
        //text += ' "urls" : [';
        for(i=0; i<obj.length; i++){
            
            if(i == 0){
                text+= '{ "id":"' + obj[i].id + '" , "theURLs" : [';
            }
            else{
                text+= ',{ "id":"' + obj[i].id + '" , "theURLs" : [';
            }

            var help = JSON.stringify(obj[i]);
            var patt = new RegExp(/(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/igm);
            var test;
            var j = 0;
            while(( test = patt.exec(help) ) != null){
                //console.log("ere" + j);
                if(j == 0){
                    text+= '{ "url":"' + test + '" }';
                }
                else{
                    text+= ',{ "url":"' + test + '" }';
                }
                j++;
            }
            text+=' ]}';
            
        }
        text+=' ]}';
        var obj1 = JSON.parse(text);
        response.setHeader('Content-Type', 'application/json');
        response.write(JSON.stringify(obj1, null, 3));
        //response.write(JSON.stringify({ a: 1 }, null, 3));
        response.end();
    }
    else if(request.url == '/tweetDetails'){

    }
    else{
        fs.readFile(filePath, function(error, content) {
            if (error) {
                if(error.code == 'ENOENT'){
                    fs.readFile('./404.html', function(error, content) {
                        response.writeHead(200, { 'Content-Type': contentType });
                        response.end(content, 'utf-8');
                    });
                }
                else {
                    response.writeHead(500);
                    response.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
                    response.end(); 
                }
            }
            else {
                response.writeHead(200, { 'Content-Type': contentType });
                response.end(content, 'utf-8');
            }
        });
        //console.log("yoooooo");
    }*/
    

}).listen(3000);
console.log('Server running at http://127.0.0.1:3000/');