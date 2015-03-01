var server = require('./httpS');
var port = process.env.PORT || 5000
server('localhost',port,'utf-8')
