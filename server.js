const express = require('express');
const server = express();
server.all('/', (req, res)=>{
    res.send('Server Online!')
})
function keepAlive(){
    server.listen(8080, '0.0.0.0');
}
module.exports = keepAlive;