// Import net module.
const net = require('net');

const client = new net.Socket();

client.connect({
    host: '127.0.0.1',
    port: 9999
})

client.on('connect', () => {
    console.log('Client: connection established with server');

    console.log('---------client details -----------------');
    var address = client.address();
    var port = address.port;
    var family = address.family;
    var ipaddr = address.address;
    console.log('Client is listening at port' + port);
    console.log('Client ip :' + ipaddr);
    console.log('Client is IP4/IP6 : ' + family);


    // writing data to server
    client.write(JSON.stringify(
        {
            port: 8080,
            host: '127.0.0.1',
            message: 'Registring into discovery'
        }
    ));

    client.setEncoding('utf-8');

    client.on('data',function(data){
        console.log('[] Receiving data from server:' + data);
    });


    setTimeout(function(){
        client.end('Bye bye server');
    },5000);      
})
