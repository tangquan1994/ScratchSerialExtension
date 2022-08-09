//****************************************************************************
//**************************nodejs websocket server***************************
//****************************************************************************
const express = require('express')
// const http = require('http')
const socketIo = require('socket.io')
const cors = require('cors')
const ws = require("nodejs-websocket") // Scream server example: "hi" -> "HI!!!"

var server = ws.createServer(function (conn) {
    console.log("New connection")
    conn.on("text", function (str) {
        console.log("Received " + str)
        conn.sendText(str.toUpperCase() + "!!!")
    })

    conn.on("close", function (code, reason) {
        console.log("Connection closed")
    })
}).listen(8000)

console.log('Websocket server started');


//****************************************************************************
//*****************************nodejs file server*****************************
//****************************************************************************
var http = require('http');
var fs = require('fs');//引入文件读取模块

var documentRoot = '.';
//需要访问的文件的存放目录

function readDir(folder, callback) {
    var fileList = []

    fs.readdir(folder, function (err, files) {
        var count = 0

        files.forEach(function (file) {
            var fullPath = folder + '/' + file;

            fs.stat(fullPath, function (err, stats) {
                if (stats.isDirectory()) {
                    // fileList.push(fullPath)
                } else {
                    /*not use ignore files*/
                    if (file[0] == '.') {

                    } else {
                        // console.log(fullPath)
                    }
                    fileList.push(fullPath)
                }
                if (++count == files.length) {
                    if (callback) {
                        callback(fileList);
                    }
                }
            })
        })
    })
}

var server = http.createServer(function (req, res) {

    var url = req.url;
    //客户端输入的url，例如如果输入localhost:8888/index.html
    //那么这里的url == /index.html 

    var file = documentRoot + url;
    //   console.log(url);
    console.log(file);
    //E:/PhpProject/html5/websocket/www/index.html

    if (url == '/') {
        res.writeHeader(200, {
            'content-type': 'text/html;charset="utf-8"'
        });

        var filePath = '.'
        var timeStart = new Date()
        readDir(filePath, function (fileList) {
            // console.log('done', new Date() - timeStart);//done 3
            fileList.sort()
            console.log(fileList); //打印出目录下的所有文件
            var html = ''
            fileList.forEach(function (file) {
                html += '<a href="' + file + '">' + file + '</a><br />'
            })

            res.write('<h1>File list:</h1><p>' + html + '</p>');
            res.end();
        })
    } else {
        fs.readFile(file, function (err, data) {
            /*
            一参为文件路径
            二参为回调函数
                回调函数的一参为读取错误返回的信息，返回空就没有错误
                二参为读取成功返回的文本内容
            */
            if (err) {
                res.writeHeader(404, {
                    'content-type': 'text/html;charset="utf-8"'
                });
                res.write('<h1>404错误</h1><p>你要找的页面不存在</p>');
                res.end();
            } else {
                res.writeHeader(200, {
                    'content-type': 'text/html;charset="utf-8"'
                    // 'content-type': 'application/octet-stream;charset="utf-8"'
                });
                res.write(data);//将index.html显示在客户端
                res.end();
            }

        });
    }

}).listen(80);

console.log('File server started');
