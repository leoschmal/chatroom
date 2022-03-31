const socket = io.connect();

socket.on('mi mensaje', (data) => {
    alert(data);
    socket.emit('notificacion', 'Mesaje recibido')
})

function enviar(){
    let mensaje = document.getElementById('inputText').value;
    socket.emit('mensaje', mensaje);
    socket.on('mensaje', (data)=>{
        document.getElementById('parrafo').innerHTML = JSON.stringify(data);
    })
}

socket.on('historial', (data) => {
    document.getElementById('parrafo').innerHTML = JSON.stringify(data);
}
)