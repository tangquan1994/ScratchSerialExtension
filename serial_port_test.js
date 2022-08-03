
const bindings_cpp_1 = require("@serialport/bindings-cpp");
var SerialPort = require('serialport').SerialPort

const serialport = new SerialPort({ path: 'COM8', baudRate: 9600 })
serialport.write('ROBOT POWER ON')

// (0, bindings_cpp_1.autoDetect)()
//     .list()
//     .then(ports => {
//         console.log(ports)
//     })
//     .catch(err => {
//     console.error(err);
//     process.exit(1);
// });

bindings_cpp_1.WindowsBinding.list().then(ports => {
        console.log(ports)
    })
    .catch(err => {
    console.error(err);
    process.exit(1);
});

// bindings_cpp_1.WindowsBinding.


