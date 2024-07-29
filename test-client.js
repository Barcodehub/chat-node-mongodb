const io = require('socket.io-client');
const readline = require('readline');

const socket = io('http://localhost:3000');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let userId, receiverId;

rl.question('Tu ID de usuario: ', (id) => {
  userId = id;
  socket.emit('join', userId);

  rl.question('ID del receptor: ', (id) => {
    receiverId = id;
    console.log('Escribe tu mensaje y presiona Enter para enviar. Escribe "salir" para terminar.');
    rl.prompt();
  });
});

socket.on('newMessage', (message) => {
  //console.log(`Mensaje recibido: ${message}`);
  console.log('Sender:', message.sender + ': ', message.content);
});

rl.on('line', (input) => {
  if (input.toLowerCase() === 'salir') {
    rl.close();
    process.exit(0);
  }
  socket.emit('sendMessage', { senderId: userId, receiverId, content: input });

});