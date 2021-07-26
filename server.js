const express = require('express');
const server = express();
server.all('/', (req, res)=>{
    res.send('Server Online!')
})
// Server
function keepAlive(){
    server.use(express.static(__dirname + '/files'))
    server.listen(process.env.PORT || 8080, '0.0.0.0');
}
module.exports = keepAlive;