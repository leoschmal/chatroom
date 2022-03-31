const socket = io.connect();

function render(data) {
    const html1 = data.map((elem, index) => {
        return(`<div>
            <strong>${elem.author}</strong>:
            <em>${elem.text}</em> </div>`)
    }).join(" ");
    document.getElementById('parrafoMensajes').innerHTML = html1;
}
function addMessage() {
    const mensaje = {
    author: document.getElementById('username').value,
    text: document.getElementById('texto').value
    };
    socket.emit('new-message', mensaje);
    return false;
    }


socket.on('messages', function(data) { render(data); });
socket.on('historial', function(data) { render(data); });




// socket.on('mi mensaje', (data) => {
//     alert(data);
//     socket.emit('notificacion', 'Mesaje recibido')
// })

// function enviar(){
//     let mensaje = document.getElementById('inputText').value;
//     socket.emit('mensaje', mensaje);
//     socket.on('mensaje', (data)=>{
//         document.getElementById('parrafo').innerHTML = JSON.stringify(data);
//     })
// }

// socket.on('historial', (data) => {
//     document.getElementById('parrafo').innerHTML = JSON.stringify(data);
// }
// )