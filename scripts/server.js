var http = require('http');
var fs = require('fs');
var path = require('path');
var obj;

http.createServer(function (request, response) {
    console.log('request starting...');

    //var obj;
    fs.readFile('favs.json', function (err, data) {
      //if (err) throw err;
      obj = JSON.parse(data, 'utf-8');
      //console.log(obj[0].id);
    });

    //console.log(obj[0].id);

    var filePath = '..' + request.url;
    if (filePath == '../')
        filePath = '../index.html';

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
        text+= '{ "firstName":"' + obj[0].created_at + '" , "lastName":"' + obj[0].id + '" }';
        for(i=1; i<obj.length; i++){
            text+= ',{ "firstName":"' + obj[i].created_at + '" , "lastName":"' + obj[i].id + '" }';
            console.log(text);
        }
        text+=' ]}';
        var obj1 = JSON.parse(text);
        response.setHeader('Content-Type', 'application/json');
        response.write(JSON.stringify(obj1, null, 3));
        //response.write(JSON.stringify({ a: 1 }, null, 3));
        response.end();
        /*
        var text = '{ "employees" : [' +
            '{ "firstName":"John" , "lastName":"Doe" },' +
            '{ "firstName":"Anna" , "lastName":"Smith" },' +
            '{ "firstName":"Peter" , "lastName":"Jones" } ]}';

        var obj = JSON.parse(text);
        
        response.setHeader('Content-Type', 'application/json');
        //var a = '{ a: 1 }';
        response.write(JSON.stringify(obj, null, 3));
        //response.write(JSON.stringify({ a: 1 }, null, 3));
        response.end();*/
        
        /*$.getJSON("./scripts/favs.json", function(result){
            $.each(result, function(i, tweet){
                $("#results").append(tweet.id + " ");
            });
        });

        response.writeHead(200);
        response.write("dog");
        response.end();*/
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
    }
    

}).listen(3000);
console.log('Server running at http://127.0.0.1:3000/');