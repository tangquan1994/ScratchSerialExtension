
const bindings_cpp_1 = require("@serialport/bindings-cpp");
var SerialPort = require('serialport').SerialPort

//获取端口列表
SerialPort.list(function (error, ports) {
    console.log('port list:');
    ports.forEach(function(port) {
        console.log(port.comName);
        console.log(port.pnpId);
        console.log(port.manufacturer);
    });
})

const serialport = new SerialPort({ path: 'COM5', baudRate: 9600 })
serialport.write('ROBOT POWER ON')

serialport.on('data', async function (data) {
	//接收到串口传递来的数据后，对数据处理
    console.log('data received: '+data)
})

// (0, bindings_cpp_1.autoDetect)()
//     .list()
//     .then(ports => {
//         console.log(ports)
//     })
//     .catch(err => {
//     console.error(err);
//     process.exit(1);
// });

// bindings_cpp_1.WindowsBinding.list().then(ports => {
//         console.log(ports)
//     })
//     .catch(err => {
//     console.error(err);
//     process.exit(1);
// });



