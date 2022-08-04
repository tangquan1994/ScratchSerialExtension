new (function() {
    var ext = this;

    var nullPort = "nothing connected";
    var availablePorts = [nullPort];
    var socket;

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
            ['', 'Search devices', 'SearchDevices'],
            ['', 'Send cmd:%s,%s', 'SendCmd', 'LED', 'white'],
            ['r', "Get device name", 'getDeviceName'],
            ['r', "Set device name: %m", 'setDeviceName', 'test'],
            ['h', 'Device connected', 'DeviceConnected'],
            ['b', 'Is device connected', 'IsDeviceConnected'],
        ],
        menus: {
            availablePorts: availablePorts,
            baudRates: [9600, 19200, 38400, 57600, 74880, 115200, 230400, 250000]
        },
        url: 'https://github.com/amandaghassaei/ScratchSerialExtension'
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

    ext.SendCmd = function(cmd, param){
        console.log("SendCmd:" + cmd + ',' + param);
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
