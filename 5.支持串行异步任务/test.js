let MyPromise = require('./promise');

let fs = require('fs');

let promise = new MyPromise((resolve, reject) => {
    fs.readFile('../file1.txt', 'utf-8', function (err, data) {

        err ? reject(err) : resolve(data);
    });
});

let f1 = function (data) {

    console.log(`f1 : ${data}`);
    return new MyPromise((resolve, reject) => {
        fs.readFile('../file2.txt', 'utf-8', function (err, data) {

            err ? reject(err) : resolve(data);
        });
    })
}
let f2 = function (data) {
    console.log(`f2 : ${data}`);
    return new MyPromise((resolve, reject) => {
        fs.readFile('../file3.txt', 'utf-8', function (err, data) {

            err ? reject(err) : resolve(data);
        });
    })
}
let f3 = function (data) {
    console.log(`f3 : ${data}`);
}
function errorLog(error) {
    console.log(error);
}

// promise.then(f1,errorLog);
// promise.then(f1).then(f2).catch(errorLog);
promise.then(f1).then(f2).then(f3).catch(errorLog);
