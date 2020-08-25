let MyPromise = require('./promise');

new MyPromise((resolve, reject) => {
    console.log(1)
    resolve(1);
})
    .then((value, err) => {
        console.log('value',value)
        return 2;
    })
    .then((value, err) => {
        console.log('value',value)
        return 3;
    });