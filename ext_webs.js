new (function() {

    console.log('extension loaded...');

    // step 1: connect to websocket server
    
    // step 2: register scratchx extension


    var ext = this;

    var socket = null;
    var is_server_connected = false;

    var nullPort = "nothing connected";
    var availablePorts = [nullPort];

    var currentPort = availablePorts[0];
    var currentBaud = 9600;
    var lastMessageReceived = "";
    var lastMessageSent = "";
    var lastError = "";
    var connected = false;
    var socketConnected = false;

    var messageReceivedEvent = false;
    var portConnectedEvent = false;
    var portDisonnectedEvent = false;
    var errorThrownEvent = false;

    var descriptor = {
        blocks: [
            ['', 'Connect to server', 'connectToServer'],
            ['', 'Disconnect from server', 'disconnectFromServer'],
            ['b', 'Connection status', 'connctionStatus'],
            ['', 'Search devices', 'SearchDevices'],
            ['', 'Send cmd:%s,%s', 'SendCmd', 'LED', 'white'],
            ['r', "Get device name", 'getDeviceName'],
            ['r', "Set device name: %m", 'setDeviceName', 'test'],
            ['h', 'Device connected', 'DeviceConnected'],
        ],
        menus: {
            availablePorts: availablePorts,
            baudRates: [9600, 19200, 38400, 57600, 74880, 115200, 230400, 250000]
        },
        url: 'https://github.com/amandaghassaei/ScratchSerialExtension'
    };

    ext.connectToServer = function(){
        if (socket == null) {
            console.log("Connect to server");

            socket = new WebSocket("ws://localhost:8000");

            socket.onopen = function() {
                is_server_connected = true;
                socket.send("hello server!");
            };

            socket.onmessage = function(e) {
                console.log(e.data);
            };

            socket.onclose = function() {
                console.log("Socket closed.");
            }
        } else {
            console.log("Already connected");
        }
    };

    ext.disconnectFromServer = function(){
        if (socket == null) {
            console.log("Already disconnected");
        } else {
            socket.close();
            socket = null;
            is_server_connected = false;
        }
    };

    ext.connctionStatus = function(){
        return is_server_connected;
    };

    ext.SendCmd = function(cmd, param){
        console.log("SendCmd:" + cmd + ',' + param);
        if (socket != null) {
            socket.send(cmd + ' ' + param);
        } else {
            console.log("Not connected");
        }
    };









    ext.SearchDevices = function(){
        console.log("SearchDevices");
        // http_request('POST', 'name', 'SearchDevices');

        let socket = new WebSocket("ws://localhost:8000");
        socket.onopen = function() {
            socket.send("秋风的笔记");
        };
        socket.onmessage = function(e) {
            console.log(e.data);
        };
    };

    ext.DeviceConnected = function(){
        console.log("DeviceConnected:");
        return false;
    };

    ext.IsDeviceConnected = function(){
        return true;
    };

    ext.getDeviceName = function(){
        return 'aaasss';
    };

    ext.setDeviceName = function(portName){
        console.log("setDeviceName:" + portName);
    };

    ScratchExtensions.register('Serial Port', descriptor, ext);
})();
