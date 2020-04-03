// Import net module.
const net = require('net');

// This function create and return a net.Socket object to represent TCP client.
function getConn(){

    const option = {
        host:'localhost',
        port: 9999
    }

    // Create TCP client.
    const client = net.createConnection(option, function () {
        console.log('[x] Client has been created');
        console.log('[x] Client local connection address : ' + client.localAddress + ":" + client.localPort);
        console.log('[x] Client remote connected at : ' + client.remoteAddress + ":" + client.remotePort);
    });

    client.setTimeout(1000);
    client.setEncoding('utf8');

    // When receive server send back data.
    client.on('data', function (data) {
        console.log('Server return data : ' + data);
    });

    // When connection disconnected.
    client.on('end',function () {
        console.log('Client socket disconnect. ');
    });

    client.on('timeout', function () {
        console.log('Client connection timeout. ');
        process.exit(0)
    });

    client.on('error', function (err) {
        console.error(JSON.stringify(err));
    });

    return client;
}



// Create node client socket.
var nodeClient = getConn();
nodeClient.write('Node is more better than java. ');