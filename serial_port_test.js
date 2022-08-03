
const bindings_cpp_1 = require("@serialport/bindings-cpp");
var SerialPort = require('serialport').SerialPort

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


//获取端口列表
SerialPort.list(function (error, ports) {
    console.log('port list:');
    ports.forEach(function(port) {
        console.log(port.comName);
        console.log(port.pnpId);
        console.log(port.manufacturer);
    });
})

const port = new SerialPort({ path: 'COM3', baudRate: 9600 })

port.open((err)=>{
    console.log('IsOpen:',port.isOpen)
    console.log('err:',err)
})

port.write('ROBOT POWER ON')

port.on('data', async function (data) {
    //接收到串口传递来的数据后，对数据处理
    console.log('data received: '+data)
})

port.on('error', function (error) {
    console.log('error: ' + error)
})


