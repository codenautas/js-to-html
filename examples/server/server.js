"use strict";

var _ = require('lodash');
var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var Promises = require('best-promise');
var fs = require('fs-promise');
var path = require('path');
var extensionServeStatic = require('extension-serve-static');
var jade = require('jade');

var karma;
var karmaIndex=process.argv.indexOf('--karma');
if(karmaIndex>0){
    var karma = require('karma');
    var karmaConfig = require('../../karma.conf.js');
    var options;
    karmaConfig({set:function(opts){ 
        options=opts; 
        if(process.argv.indexOf('--single-run')>0){
            options.singleRun=true;
        }
        var posBrowsers = process.argv.indexOf('--browsers')
        if(posBrowsers>0){
            options.browsers=(process.argv[posBrowsers+1]||'').split(',');
        }
    }});
    console.log('karma starting');
    var karmaServer = new karma.Server(options, function(exitCode) {
        console.log('Karma has exited with ' + exitCode);
        process.exit(exitCode);
    })
    karmaServer.start();
    console.log('karma starting',options.port);
}

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));

function serveJade(pathToFile,anyFile){
    return function(req,res,next){
        if(path.extname(req.path)){
            return next();
        }
        Promise.resolve().then(function(){
            var fileName=pathToFile+(anyFile?req.path+'.jade':'');
            return fs.readFile(fileName, {encoding: 'utf8'})
        }).catch(function(err){
            if(anyFile && err.code==='ENOENT'){
                throw new Error('next');
            }
            throw err;
        }).then(function(fileContent){
            var htmlText=jade.render(fileContent);
            serveHtmlText(htmlText)(req,res);
        }).catch(serveErr(req,res,next));
    }
}

// probar con http://localhost:12348/ajax-example
app.use('/',serveJade('examples/client',true));

function serveHtmlText(htmlText){
    return function(req,res){
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.setHeader('Content-Length', htmlText.length);
        res.end(htmlText);
    }
}

function serveErr(req,res,next){
    return function(err){
        if(err.message=='next'){
            return next();
        }
        console.log('ERROR', err);
        console.log('STACK', err.stack);
        var text='ERROR! '+(err.code||'')+'\n'+err.message+'\n------------------\n'+err.stack;
        res.writeHead(200, {
            'Content-Length': text.length,
            'Content-Type': 'text/plain; charset=utf-8'
        });
        res.end(text);
    }
}

var mime = extensionServeStatic.mime;

var validExts=[
    'html',
    'jpg','png','gif',
    'css','js','manifest'];

// ajax-best-promise.js
// 
app.use('/',extensionServeStatic('./bin', {
    index: ['index.html'], 
    extensions:[''], 
    staticExtensions:validExts
}));

app.use('/',extensionServeStatic('./examples/client', {
    index: ['index.html'], 
    extensions:[''], 
    staticExtensions:validExts
}));

var actualConfig;

var clientDb;

var PORT=12448;

var server=app.listen(PORT, function(event) {
    console.log('Listening on port %d', server.address().port);
});

app.get('/',serveHtmlText('<h1>Ajax-best-promise example </h1>'));

if(karma){
    app.use(function(req,res,next){
        res.append('Access-Control-Allow-Origin', '*');
        res.append('Access-Control-Allow-Headers', 'X-Requested-With');
        next();
    });
}

app.get('/ejemplo/suma',function(req,res){
    var params=req.query;
    // probar con localhost:12448/ejemplo/suma?alfa=3&beta=7
    res.send((Number(req.query.p1)+Number(req.query.p2)).toString());
});

app.post('/ejemplo/post/upper',function(req,res){
    var params=req.body;
    res.send(params.text.toUpperCase());
});

app.get('/ejemplo/error',function(req,res){
    var params=req.query;
    // no es lo mejor devolverle los datos al cliente
    res.status(400).send(JSON.stringify({message:'invalid parameters', data:req.query.p_valor_malo}));
});

app.get('/ejemplo/flujo',function(req,res){
    var params=req.query;
    var paso=0;
    var primos=[];
    res.append('Content-Type', 'application/octet-stream'); // por chrome bug segun: http://stackoverflow.com/questions/3880381/xmlhttprequest-responsetext-while-loading-readystate-3-in-chrome
    var esPrimo=function(x){
        if(x<2) return false;
        for(var i=0; i<primos.length; i++){
            var divisor=primos[i];
            if(x % divisor ==0){
                return false;
            }
        }
        primos.push(x);
        return true;
    }
    var iterador=setInterval(function(){
        paso++;
        var data='line '+paso+(esPrimo(paso)?' es primo!':'')+'\n';
        res.write(data);
        if(paso>=params.limite){
            res.end();
            clearInterval(iterador);
        }
    },params.delay||1000);
});

app.get('/ejemplo/json-stream',function(req,res){
    var params=req.query;
    var dataReadyForStream=JSON.parse(params.data).map(function(element){
        return JSON.stringify(element);
    }).join('\n');
    var chunks=['"one"\n','2\r3\r\n',dataReadyForStream.substr(0,10),dataReadyForStream.substr(10),'',''];
    var step=0;
    res.append('Content-Type', 'application/octet-stream'); // por chrome bug segun: http://stackoverflow.com/questions/3880381/xmlhttprequest-responsetext-while-loading-readystate-3-in-chrome
    var iterador=setInterval(function(){
        res.write(chunks[step]);
        step++;
        if(step>=chunks.length){
            res.end();
            clearInterval(iterador);
        }
    },params.delay||1000);
});
