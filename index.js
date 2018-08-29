var http = require('http');
var https = require('https');
var URL = require('url');

var requests = function(url){
    console.log(url);
    let opt = {};
    let callback = null;

    if(arguments.length == 1){
        opt = arguments[0];
        if(typeof(opt) == "string"){
            opt = {url: opt};
        }
    }else if(arguments.length == 2){
        if(typeof(arguments[1]) == "function"){
            callback = arguments[1];
            opt = arguments[0];
            if(typeof(opt) == "string"){
                opt = {url: opt};
            }
        }else{
            url = arguments[0];
            opt = arguments[1];
        }
    }else{
        opt = arguments[1];
        opt.url = opt.url || arguments[0];
        callback = arguments[2];
    }

    opt.method = opt.method || "GET";
    if(opt.method.toLowerCase() == "get"){
        return requests.get(opt, callback);
    }else if(opt.method.toLowerCase() == "post"){
        return requests.post(opt, callback);
    }else if(opt.method.toLowerCase() == "put"){
        return requests.put(opt, callback);
    }else if(opt.method.toLowerCase() == "delete"){
        return requests.delete(opt, callback);
    }

}

requests.get = function(){
    let opt = arguments[0];
    let callback = arguments[1];

    if(typeof arguments[0] === 'string'){
        opt = {
            url : arguments[0]
        }
    }


    return new Promise(function(resolve, reject){

        let url = opt.url;
        let httpRequest = http;
        if(url.match(/^https:\/\//)){
            httpRequest = https;
        }

        httpRequest.get(url, (res)=>{
            let contentType = res.headers['content-type'];
            let body = '';
            let err = null; 
            res.setEncoding('utf8');

            res.on('data', (chunk)=>{
                body += chunk;
            });
            res.on('end', ()=>{
                try{
                    if(/^application\/json/.test(contentType)){
                        body = JSON.parse(body);
                    }
                    res.body = body;
    
                }catch(e){
                    err = e;
                }
                if(!err){
                    resolve(res);
                }else{
                    reject(err);
                }
                !!callback && callback(err, res, body);
            });

        }).on('error',(err)=>{
            reject(err, null, null);
            !!callback && callback(err, null, null);
            
        });


    });

};

requests.post = function(){
    let opt = arguments[0];
    let callback = arguments[1];

    if(typeof arguments[0] === 'string'){
        opt = {
            url : arguments[0]
        }
    }



    let options = {};
    for(let key in opt){
        options[key] = opt[key];
    }
    options.method = "POST";

    sendData = opt.body || JSON.stringify(opt.json || {});

    options.headers = options.headers || {};
    options.headers["Content-Length"] = Buffer.byteLength(sendData);

    return new Promise(function(resolve, reject){

        let url = opt.url;
        let httpRequest = http;
        if(url.match(/^https:\/\//)){
            httpRequest = https;
        }

        
        let req = httpRequest.request(opt.url, options, (res)=>{
            let contentType = res.headers['content-type'];
            let body = '';
            let err = null; 
            res.setEncoding('utf8');

            res.on('data', (chunk)=>{
                body += chunk;
            });
            res.on('end', ()=>{
                try{
                    if(/^application\/json/.test(contentType)){
                        body = JSON.parse(body);
                    }
    
                }catch(e){
                    err = e;
                }
                if(!err){
                    resolve(err, res, body);
                }else{
                    reject(err, res, body);
                }
                !!callback && callback(err, res, body);
            });
            
        }).on('error', (err)=>{
            reject(err, null, null);
            !!callback && callback(err, null, null);
            
        });
            
        req.write(sendData);
        req.end();
    });


}


requests.put = function(){

    let opt = arguments[0];
    let callback = arguments[1];

    if(typeof arguments[0] === 'string'){
        opt = {
            url : arguments[0]
        }
    }



    let options = {};
    for(let key in opt){
        options[key] = opt[key];
    }
    options.method = "PUT";

    sendData = opt.body || JSON.stringify(opt.json || {});

    options.headers = options.headers || {};
    options.headers["Content-Length"] = Buffer.byteLength(sendData);

    return new Promise(function(resolve, reject){
        let url = opt.url;
        let httpRequest = http;
        if(url.match(/^https:\/\//)){
            httpRequest = https;
        }

        
        let req = httpRequest.request(opt.url, options, (res)=>{
            let contentType = res.headers['content-type'];
            let body = '';
            let err = null; 
            res.setEncoding('utf8');

            res.on('data', (chunk)=>{
                body += chunk;
            });
            res.on('end', ()=>{
                try{
                    if(/^application\/json/.test(contentType)){
                        body = JSON.parse(body);
                    }
    
                }catch(e){
                    err = e;
                }
                if(!err){
                    resolve(err, res, body);
                }else{
                    reject(err, res, body);
                }
                !!callback && callback(err, res, body);
            });
            
        }).on('error', (err)=>{
            reject(err, null, null);
            !!callback && callback(err, null, null);
            
        });
            
        req.write(sendData);
        req.end();
    });


}


requests.delete = function(){

    let opt = arguments[0];
    let callback = arguments[1];

    if(typeof arguments[0] === 'string'){
        opt = {
            url : arguments[0]
        }
    }



    let options = {};
    for(let key in opt){
        options[key] = opt[key];
    }
    options.method = "DELETE";

    options.headers = options.headers || {};
    options.headers["Content-Length"] = Buffer.byteLength(sendData);

    return new Promise(function(resolve, reject){
        let url = opt.url;
        let httpRequest = http;
        if(url.match(/^https:\/\//)){
            httpRequest = https;
        }

        let req = httpRequest.request(opt.url, options, (res)=>{
            let contentType = res.headers['content-type'];
            let body = '';
            let err = null; 
            res.setEncoding('utf8');

            res.on('data', (chunk)=>{
                body += chunk;
            });
            res.on('end', ()=>{
                try{
                    if(/^application\/json/.test(contentType)){
                        body = JSON.parse(body);
                    }
    
                }catch(e){
                    err = e;
                }
                if(!err){
                    resolve(err, res, body);
                }else{
                    reject(err, res, body);
                }
                !!callback && callback(err, res, body);
            });
            
        }).on('error', (err)=>{
            reject(err, null, null);
            !!callback && callback(err, null, null);
            
        });
            
        req.end();
    });


}



module.exports = requests;