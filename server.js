const express = require('express');
const server = express();
server.all('/', (req, res)=>{
    res.send('Server Online!')
})
// Server
function keepAlive(){
    server.listen(process.env.PORT || 80, '0.0.0.0');
}
module.exports = keepAlive;