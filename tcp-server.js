const net = require('net');

const server = net.createServer();

server.on('close', () => console.log('Server has been closed!'))

server.on('connection', socket => {

    const serverAddress = server.address();
    const { port, family, address } = serverAddress;

    console.log('Server is litening on port: ', port);
    console.log('Server Ip: ', address);
    console.log('Server is Ip4/Ip6: ', family);

    const { localPort, localAddress } = socket;
    const { remoteAddress, remotePort, remoteFamily } = socket;

    console.log('Server is listening at local port: ', localPort)
    console.log('Server is listening at local address: ', localAddress)

    console.log('Remote Socket is listening at port: ', remotePort)
    console.log('Remote Socket ip: ', remoteAddress)
    console.log('Remote Socker is IPV4/IPV6: ', remoteFamily);

    server.getConnections((err, count) => {
        if (err) {
            console.log("Error at counting number of server connections")
            return
        }
        console.log('Number of concurrent connections to the server', count);
    })


    socket.setEncoding('utf-8');
    socket.setTimeout(8000, () => {
        // called after timeout -> same as socket.on('timeout')
        // it just tells that soket timed out => its ur job to end or destroy the socket.
        // socket.end() vs socket.destroy() => end allows us to send final data and allows some i/o activity to finish before destroying the socket
        // whereas destroy kills the socket immediately irrespective of whether any i/o operation is goin on or not...force destry takes place
        console.log('Socket time out')
    });


    socket.on('data', (data) => {
        var bread = socket.bytesRead;
        var bwrite = socket.bytesWritten;
        console.log('Bytes read : ' + bread);
        console.log('Bytes written : ' + bwrite);
        console.log('Data sent to server : ' + data);

        //echo data
        var is_kernel_buffer_full = socket.write('Data ::' + data);
        if(is_kernel_buffer_full){
            console.log('Data was flushed successfully from kernel buffer i.e written successfully!');
        }else{
            socket.pause();
        }
    });


    socket.on('drain',function(){
        console.log('write buffer is empty now .. u can resume the writable stream');
        socket.resume();
      });
      
      socket.on('error',function(error){
        console.log('Error : ' + error);
      });
      
      socket.on('timeout',function(){
        console.log('Socket timed out !');
        socket.end('Timed out!');
        // can call socket.destroy() here too.
      });
      
      socket.on('end',function(data){
        console.log('Socket ended from other end!');
        console.log('End data : ' + data);
      });
      
      socket.on('close',function(error){
        var bread = socket.bytesRead;
        var bwrite = socket.bytesWritten;
        console.log('Bytes read : ' + bread);
        console.log('Bytes written : ' + bwrite);
        console.log('Socket closed!');
        if(error){
          console.log('Socket was closed coz of transmission error');
        }
      }); 

      setTimeout(function(){
        var isdestroyed = socket.destroyed;
        console.log('Socket destroyed:' + isdestroyed);
        socket.destroy();
      },1200000);

});



// emits when any error occurs -> calls closed event immediately after this.
server.on('close', function () {
    console.log('TCP server socket is closed.');
});

server.on('error', function (error) {
    console.error(JSON.stringify(error));
});

//emits when server is bound with server.listen
server.on('listening',function(){
console.log('Server is listening!');
});

server.maxConnections = 10;


server.listen(9999, () => {
     // Get server address info.
    const serverInfo = server.address();
    console.log('%d TCP server has been started, listen address', Date.now(), JSON.stringify(serverInfo))
});