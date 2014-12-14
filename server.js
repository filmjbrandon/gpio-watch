var app = require('http').createServer(handler),
  io = require('socket.io').listen(app),
  fs = require('fs'),
  Gpio = require('onoff').Gpio,
  pin01 = new Gpio(17, 'out', 'both'),
  pin02 = new Gpio(18, 'out', 'both'),
  pin03 = new Gpio(19, 'out', 'both');

// creating the server ( 192.169.1.69:8000 )
app.listen(8000);

// on server started we can load our client.html page
function handler(req, res) {
  fs.readFile(__dirname + '/client.html', function(err, data) {
    if (err) {
      console.log(err);
      res.writeHead(500);
      return res.end('Error loading client.html');
    }
    res.writeHead(200);
    res.end(data);
  });
}

// creating a new websocket 
io.sockets.on('connection', function(socket) {
  console.log(__dirname);
  pin01.watch(function(err, value) {
    if (err) throw err;
    socket.volatile.emit('pin01_state', value); // The current state of the pin
  }); 
  pin02.watch(function(err, value) {
    if (err) throw err;
    socket.volatile.emit('pin02_state', value); // The current state of the pin
  }); 
  pin03.watch(function(err, value) {
    if (err) throw err;
    socket.volatile.emit('pin03_state', value); // The current state of the pin
  }); 

});
