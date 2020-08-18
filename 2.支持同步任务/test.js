let MyPromise = require('./promise');

let fs = require('fs');

let promise = new MyPromise((resolve,reject)=>{
    
    fs.readFile('../file.txt','utf-8',(err,data)=>{
        err ? reject(err) : resolve(data);
    })
});

function successLog(data){
    console.log(data);
}

function errorLog(error){
    console.log(error);
}


promise.then(successLog,errorLog);

new MyPromise((resolve,reject)=>{
    resolve('同步任务。。。');
}).then((val)=>{
    console.log(val);
})