const express = require('express');
const {Server: HttpServer} = require('http');
const {Server: IOServer} = require('socket.io');


const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.set('view engine', 'ejs');
app.set('views',  './public/views/pages');
const productos = [{"id":"1", "title":"Bicicleta","price":"$49.346.-", "url":"https://cdn2.iconfinder.com/data/icons/miscellaneous-iii-glyph-style/150/cycling-256.png"},{"id":"2", "title":"Monopatín","price":"$23.562.-", "url":"https://cdn1.iconfinder.com/data/icons/sport-fitness-vol-3-1/512/skate_rollers_rolling_street-256.png"},{"id":"3", "title":"Skate","price":"$12.365.-","url":"https://cdn0.iconfinder.com/data/icons/sport-and-fitness-1/32/Sports_and_Fitness_skate_freestyle_skating_skateboard-256.png"}]
const mensajes = [];
let changeView = true;

app.use(express.static(__dirname + './public'));

app.get('/', (req, res) => {
    res.render('public/views/pages/index.ejs', {root: __dirname});})

// app.get('/productos', (req, res)=>{
//     changeView = !changeView;
//     res.render('pages/index', {productos: productos, changeView: changeView});   
    
// })
// app.post('/productos', (req,res)=>{
//     console.log(req.body);
//     productos.push(req.body);    
//     changeView= true; 
//     res.render('pages/index', {productos: productos,  changeView: changeView})
// })

io.on('connection', (socket) => {
    // "connection" se ejecuta la primera vez que se abre una nueva conexión
      console.log('Usuario conectado')
    // Se imprimirá solo la primera vez que se ha abierto la conexión  
    socket.emit('mi mensaje', 'Hola desde el servidor');
    socket.emit('historial', mensajes);
    socket.on('notificacion', (data) => {
        console.log(data);        
    })  
    socket.on('mensaje', (data)=>{
        mensajes.push(data);
        console.log(data)
        io.sockets.emit('mensaje', mensajes);
    })
    })

  

httpServer.listen(8080, ()=>{
    console.log('port 8080 is the magic port')
})
