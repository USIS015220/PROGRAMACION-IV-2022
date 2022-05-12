const express = require('express'),
server = express(),
port = 3001;

server.get('/chat', function (req, resp){


    resp.send('hola mundo');
});

server.get('/usuarios', function (req, resp){


    resp.send('Bienvenido al usuario');
});

server.listen(port, function (event){
    console.log('Server running on port $(port)');
});
