const Mypromise = require('./promise');
const fs = require('fs');


const p = new Mypromise((resolve, rejct) => {
    fs.readFile('../file.txt', 'utf-8', (err, data) => {

        err ? rejct(err) : resolve(data);
    })

})

p.then(val => {
    console.log('val', val);
    // return 2
    return new Mypromise((resolve, rejct) => {
        fs.readFile('../file1.txt', 'utf-8', (err, data) => {
            err ? rejct(err) : resolve(data);
        })
    })

}).then(val => {
    console.log(val);
    return 3;
}).then(val=>console.log(val))