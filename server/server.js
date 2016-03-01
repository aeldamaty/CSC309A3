//Anything we will require is listed here.
var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');
var obj;

//This function addes slashes to specific characters so we don't get errors because of special characters
//such as / or ' that a user might have typed in the tweet text when trying to parse it as a JSON object.
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

//Create the Server
http.createServer(function (request, response) {

    fs.readFile('favs.json', function (err, data) {
      if (err) throw err;
      obj = JSON.parse(data, 'utf-8');
    });

    //This will help for the the switch and for searching
    var theURL, lookFor;
    var search = false;


    //The following determines and sets the variables above to what the user wants
    var directory = path.dirname(request.url);
    var base = path.basename(request.url);

    if(directory == "/"){
        if(request.url == "/tweets/" || request.url == "/tweets")
            theURL = "/tweets";
        else if(request.url == "/users/" || request.url == "/users")
            theURL = "/users";
        else if(request.url == "/links/" || request.url == "/links")
            theURL = "/links";
    }
    else{
        if(directory == "/tweets/" || directory == "/tweets")
            theURL = "/tweets";
        else if(directory == "/users/" || directory == "/users")
            theURL = "/users";
        else if(directory == "/links/" || directory == "/links")
            theURL = "/links";
        if(base != ""){
            lookFor = base;
            search = true;
        }
    }

    

    //The following sets the content type to whatever file is being requested
    //This is especially useful for bootstrap
    var extname = path.extname(base);
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

    //The main switch statement to determine what needs to be sent back to the client
    switch(theURL){
        //This returns the html file for the site
        case "/index.html":
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

        //This returns either all tweets or a specific tweet if requested
        case "/tweets":
            if(search){
                var found = false;
                var text = '[';
                for(i=0; i<obj.length; i++){
                    if(lookFor==obj[i].id_str){
                        text+= '{ "created_at":"' + obj[i].created_at + '" , "screen_name":"' + obj[i].user.screen_name  + '" , "text":"' + addslashes(obj[i].text) + '" }';
                        found = true;
                        break;
                    }
                }
                if(!found)
                    text+= '{ "code":"' + "204" + '" , "message":"' + "tweet not found" + '" }';
                text+=' ]';
                var obj1 = JSON.parse(text);
                response.setHeader('Content-Type', 'application/json');
                response.write(JSON.stringify(obj1, null, 3));
                response.end();
            }
            else{
                var text = '[';
                text+= '{ "created_at":"' + obj[0].created_at + '" , "id":"' + obj[0].id_str  + '" , "text":"' + addslashes(obj[0].text) + '" }';
                for(i=1; i<obj.length; i++){
                    text+= ',{ "created_at":"' + obj[i].created_at + '" , "id":"' + obj[i].id_str + '" , "text":"' + addslashes(obj[i].text)   + '" }';
                }
                text+=' ]';    
                var obj1 = JSON.parse(text);
                response.setHeader('Content-Type', 'application/json');
                response.write(JSON.stringify(obj1, null, 3));
                response.end();
            }
            break;

        //This returns users or specific users if requested
        case "/users":
            if(search){
                var found = false;
                var text = '[';
                for(i=0; i<obj.length && !found; i++){
                    if(lookFor == obj[i].user.screen_name){
                        text+= '{ "screen_name":"' + obj[i].user.screen_name + '" , "name":"' + obj[i].user.name + '" , "location":"' + obj[i].user.location + '" , "description":"' + obj[i].user.description + '" , "followers_count":"' + obj[i].user.followers_count + '" , "friends_count":"' + obj[i].user.friends_count + '" }';
                        found = true;
                        break;
                    }
                }

                for(i=0; i<obj.length && !found; i++){
                    for(j=0; j < obj[i].entities.user_mentions.length; j++){
                        if(lookFor == obj[i].entities.user_mentions[j].screen_name){
                            text+= '{ "screen_name":"' + obj[i].entities.user_mentions[j].screen_name + '" , "name":"' + obj[i].entities.user_mentions[j].name + '" , "location":"' + obj[i].entities.user_mentions[j].location + '" , "description":"' + obj[i].entities.user_mentions[j].description + '" , "followers_count":"' + obj[i].entities.user_mentions[j].followers_count + '" , "friends_count":"' + obj[i].entities.user_mentions[j].friends_count + '" }';
                            found = true;
                            break;
                        }
                    }
                }
                if(!found)
                    text+= '{ "code":"' + "204" + '" , "message":"' + "user not found" + '" }';
                text+=' ]';    
                var obj1 = JSON.parse(text);
                response.setHeader('Content-Type', 'application/json');
                response.write(JSON.stringify(obj1, null, 3));
                response.end();
            }
            else{
                var theUsers = [];
                var text = '[';
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
                
                text+=' ]';    
                var obj1 = JSON.parse(text);
                response.setHeader('Content-Type', 'application/json');
                response.write(JSON.stringify(obj1, null, 3));
                response.end();
            }
            break;

        //Returns all links grouped by tweet id
        case "/links":
            var text = '[';
            for(i=0; i<obj.length; i++){
                
                if(i == 0){
                    text+= '{ "id":"' + obj[i].id_str + '" , "theURLs" : [';
                }
                else{
                    text+= ',{ "id":"' + obj[i].id_str + '" , "theURLs" : [';
                }

                var help = JSON.stringify(obj[i]);
                var patt = new RegExp(/(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/igm);
                var test;
                var j = 0;
                while(( test = patt.exec(help) ) != null){
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
            text+=' ]';
            var obj1 = JSON.parse(text);
            response.setHeader('Content-Type', 'application/json');
            response.write(JSON.stringify(obj1, null, 3));
            response.end();
            break;

        //This is used to try to send back whatever other file is requested. Especially useful for the bootstrap css
        default:
            var toRead = ".." + request.url;
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
}).listen(3000);
console.log('Server running at http://127.0.0.1:3000/');