const express = require('express');
const {Server: HttpServer} = require('http');
const {Server: IOServer} = require('socket.io');
const path = require('path');


const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(express.static('./public'));

const mensajes = [];
const productos = [{"id":"7", "title":"Bicicleta","price":"$49.346.-", "url":"https://cdn2.iconfinder.com/data/icons/miscellaneous-iii-glyph-style/150/cycling-256.png"},{"id":"8", "title":"Monopatín","price":"$23.562.-", "url":"https://cdn1.iconfinder.com/data/icons/sport-fitness-vol-3-1/512/skate_rollers_rolling_street-256.png"},{"id":"9", "title":"Skate","price":"$12.365.-","url":"https://cdn0.iconfinder.com/data/icons/sport-and-fitness-1/32/Sports_and_Fitness_skate_freestyle_skating_skateboard-256.png"}]


app.get('/', (req, res) => {
    res.sendFile('/public/index.html', {root: __dirname});})


io.on('connection', (socket) => {
    // "connection" se ejecuta la primera vez que se abre una nueva conexión
    console.log('Usuario conectado')
    // Se imprimirá solo la primera vez que se ha abierto la conexión      
    socket.emit('historial', mensajes);
    socket.on('notificacion', (data) => {
        console.log(data);        
    })  
    socket.on('new-message', (data)=>{
        //recibo el new message del cliente
        mensajes.push(data);
        console.log(data);
        // se lo mando a todos los clientes
        io.sockets.emit('messages', mensajes);
    })
    })

  

httpServer.listen(8080, ()=>{
    console.log('port 8080 is the magic port')
})
