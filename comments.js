// Create web server

var http = require('http');
var fs = require('fs');
var url = require('url');

var comments = [];

var server = http.createServer(function(request, response) {
  // 解析 url，获取 pathname
  var parseObj = url.parse(request.url, true);
  var pathname = parseObj.pathname;
  if (pathname === '/') {
    fs.readFile('./views/index.html', function(err, data) {
      if (err) {
        return response.end('404 Not Found.');
      }
      var htmlStr = template.render(data.toString(), {
        comments: comments
      });
      response.end(htmlStr);
    });
  } else if (pathname === '/post') {
    fs.readFile('./views/post.html', function(err, data) {
      if (err) {
        return response.end('404 Not Found.');
      }
      response.end(data);
    });
  } else if (pathname.indexOf('/public/') === 0) {
    fs.readFile('.' + pathname, function(err, data) {
      if (err) {
        return response.end('404 Not Found.');
      }
      response.end(data);
    });
  } else if (pathname === '/pinglun') {
    var comment = parseObj.query;
    comment.dateTime = '2019-03-22 17:15:10';
    comments.unshift(comment);
    // 重定向
    response.statusCode = 302;
    response.setHeader('Location', '/');
    response.end();
  } else {
    fs.readFile('./views/404.html', function(err, data) {
      if (err) {
        return response.end('404 Not Found.');
      }
      response.end(data);
    });
  }
});

server.listen(3000, function() {
  console.log('Server is running...');
});