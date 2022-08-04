const express=require('express');
const cors = require('cors')
const bodyParser = require('body-parser')

// 一定要放在路由之前，否则会出现没有数据的情况

//一个express实例

const app=express();

const corsConfig = {
    origin:'http://localhost:8080',
    credentials:true,
}

//使用默认
app.use(cors())
//或修改默认配置
app.use(cors(corsConfig))
  
// app.use((req, rsp, next) => {
//     rsp.setHeader('Access-Control-Allow-Origin', '*')
//     next()
// })

// 解析请求体
app.use(bodyParser.urlencoded({extended: true}) )
// app.use(bodyParser.json())
app.use(bodyParser.text())

app.all("*",function(req,res,next) {

    //设置允许跨域的域名，*代表允许任意域名跨域

    res.header("Access-Control-Allow-Origin","*");

    //允许的header类型

    res.header("Access-Control-Allow-Headers","content-type");

    //跨域允许的请求方式 

    res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");

    if (req.method.toLowerCase() == 'options')
        res.send(200);  //让options尝试请求快速结束
    else
        next();
})

app.get('/name',(req,res)=>{

    let {age}=req.params;

    res.send('tom');
    
    // port.write('tom get')
});

app.post('/name',(req,res)=>{

    res.send('tom post');

    // port.write('tom post')
});

app.post('/cmd/light_on/*',(req,res)=>{
    console.log(req.url)
    console.log(req.body)
    res.send('cmd post');
    port.write(req.url + ' ' + req.body)
});

app.listen(8080,()=>{

    console.log('启动成功');

});

// serial port

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

const port = new SerialPort({ path: 'COM5', baudRate: 9600 })

port.open((err)=>{
    console.log('IsOpen:',port.isOpen)
    console.log('err:',err)
})

port.write('ROBOT POWER ON\n')

port.on('data', async function (data) {
    //接收到串口传递来的数据后，对数据处理
    console.log('data received: '+data)
})

port.on('error', function (error) {
    console.log('error: ' + error)
    process.exit(1);
})


