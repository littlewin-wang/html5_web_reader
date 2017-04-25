var fs = require('fs');

exports.get_test_data = function() {
  var content = fs.readFileSync('./mock/test.json', 'utf-8');
  return content;
}

exports.get_search_data = function(start, end, keyword) {
  return function(callback) {
    var http = require('http');
    var qs = require('querystring');
    var data = {
      s: keyword,
      start: start,
      end: end
    };
    var content = qs.stringify(data);
    var http_request = {
      hostname: 'dushu.xiaomi.com',
      port: 80,
      path: '/store/v0/lib/query/onebox?' + content,
      method: 'GET'
    }

    req_obj = http.request(http_request, function(_res) {
      var content = '';
      _res.setEncoding('utf-8');
      
      _res.on('data', function(chunk){
        content += chunk;
      })

      _res.on('end', function(e) {
        callback(null, content)
      })
    });

    req_obj.on('error', function() {

    });

    req_obj.end()
  }
}
