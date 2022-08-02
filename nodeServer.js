const express=require('express');
const cors = require('cors')

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

app.all("*",function(req,res,next){

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

  
//app.use((req,res)=>{

//  res.json({

//  name:"张上"

//  })

//})

app.get('/name',(req,res)=>{

    let {age}=req.params;

    res.send('tom');

});

app.post('/name',(req,res)=>{

    res.send('tom post');

});

 

app.listen(8080,()=>{

    console.log('启动成功');

});