const socket = io.connect();

function render(data) {
    const html1 = data.map((elem, index) => {
        return(`<div>
            <em style="color: green">${elem.date}</em>
            <strong style="color: blue">${elem.author}:</strong>
            <em>${elem.text}</em> </div>`)
    }).join(" ");
    document.getElementById('parrafoMensajes').innerHTML = html1;
}

function renderLista(data) {
    const html = data.map((elem, index) => {
        return(`   <tr>
                    <td> ${elem.title}</td>
                    <td> ${elem.price} </td>
                    <td> <img src= ${elem.url} alt=${elem.title} width="30" height="30"></td>     
                    </tr>                         
                `)
    }).join(" ");
    document.getElementById('lista').innerHTML = html;
}

function addMessage() {
    const mensaje = {
    author: document.getElementById('username').value,
    text: document.getElementById('texto').value,
    date: new Date().toTimeString()
    };
    socket.emit('new-message', mensaje);
    return false;
    }

function addProduct() {
    const product = {
    title: document.getElementById('title').value,
    price: document.getElementById('price').value,
    url: document.getElementById('url').value
    };
    socket.emit('new-product', product);
    return false;
    }


socket.on('messages', function(data) { render(data); });
socket.on('historial', function(data) { render(data); });

socket.on('historialProductos', function(data) { renderLista(data); });
socket.on('productos', function(data) { renderLista(data); });






