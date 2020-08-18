let MyPromise = require('./promise');

let fs = require('fs');

let promise = new MyPromise((resolve,reject)=>{
    fs.readFile('../file.txt','utf-8',function(err,data){
        err ? reject(err) : resolve(data);
    });
});

function fn1(data){
    console.log(`fn1: ${data}`);
}

function fn2(data){
    console.log(`fn2: ${data}`);
}

function errorLog(error){
    console.log(error);
}

promise.then(fn1,errorLog);

setTimeout(()=>{
    promise.then(fn2,errorLog)
},2000)