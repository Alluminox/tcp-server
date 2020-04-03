const net = require('net');

const server = net.createServer(socket => {

    const { localAddress, localPort, remoteAddress, remotePort } = socket;
    console.log('[x] Client connected');
    console.log(`[x] Local client Connected ${localAddress}:${localPort}`);
    console.log(`[x] Remote client Connected ${remoteAddress}:${remotePort}`)
    
    socket.setEncoding('utf-8');
    socket.setTimeout(1000);

    socket.on('data', (data) => {
        console.log('Client send data', data)
    });

    socket.on('end', () => {
        console.log("Client disconnected");

        server.getConnections((err, count) => {
            if (!err) console.log('[-] Total of connections now', count);
            else console.error('[!] ERROR', JSON.stringify(err));
        }) 
    });

    socket.on('timeout', () => {
        console.log('Client request time out');

    })

});



server.listen(9999, () => {
     // Get server address info.
    const serverInfo = server.address();
    console.log('%d TCP server has been started, listen address', Date.now(), JSON.stringify(serverInfo))

    server.on('close', function () {
        console.log('TCP server socket is closed.');
    });

    server.on('error', function (error) {
        console.error(JSON.stringify(error));
    });
});