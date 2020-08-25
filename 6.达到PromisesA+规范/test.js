// 

const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

function MyPromise(fn) {
    const self = this;
    self.value = null;
    self.error = null;
    self.status = PENDING;
    //保留 回调函数
    self.onFulfilledCallbacks = [];
    self.onRejectedCallbacks = [];

    function resolve(value) {
        if (value instanceof MyPromise) {//
            value.then(resolve, reject);
        }
        if (self.status === PENDING) {
            setTimeout(() => {
                self.value = value;
                self.status = FULFILLED;
                self.onFulfilledCallbacks.forEach(callback => callback(self.value))
            }, 0)
        }
    }

    function reject(error) {
        if (self.status === PENDING) {
            setTimeout(() => {
                self.error = error;
                self.status = REJECTED;
                self.onRejectedCallbacks.forEach(callback => callback(self.error))
            }, 0)
        }
    }


    try {
        fn(resolve, reject);
    } catch (error) {
        reject(error)
    }

};
//解析 promise 结果
function resolvePromise(bridgePromise, x, resolve, reject) {
    if(bridgePromise === x){
        return reject(new TypeError('circular reference'));
    }
    let called = false;
    if(x instanceof MyPromise){
        if(x.status === PENDING){
            x.then(y=>{
                resolvePromise(bridgePromise,y,resolve,reject);
            },e=>{
                reject(e);
            })
        }else{
            x.then(resolve,reject);
        }
    }else if(x !=null && ( (typeof x === 'function') || (typeof x === 'object') )){
        try{
            let then = x.then;
            if(typeof then === 'function'){
                then.call(x,y=>{
                    if(called) return;
                    called = true;
                    resolvePromise(bridgePromise,y,resolve,reject);
                },error=>{
                    if(called) return;
                    called = true;
                    reject(error)
                }) 
            }else{
                resolve(x);
            }
        }catch(e){

        }
    }else{
        resolve(x);
    }
}
MyPromise.prototype.then = function (onFulfilled, onRejected) {
    const self = this;
    let bridgePromise = null;

    //传入函数检验
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
    onRejected = typeof onRejected === 'function' ? onRejected : error => { throw error };

    if (self.status === PENDING) {
        return bridgePromise = new MyPromise(function (resolve, reject) {
            self.onFulfilledCallbacks.push(value=>{
                try {
                    const x = onFulfilled(value);
                    resolvePromise(bridgePromise, x, resolve, reject);
                } catch (error) {
                    reject(error)
                }
            })
            self.onRejectedCallbacks.push(error=>{
                try {
                    const x = onFulfilled(error);
                    resolvePromise(bridgePromise, x, resolve, reject);
                } catch (error) {
                    reject(error)
                }
            })
        })
    }
    if (self.status === FULFILLED) {
        return bridgePromise = new MyPromise(function (resolve, reject) {
            setTimeout(() => {

                try {
                    const x = onFulfilled(self.value);
                    resolvePromise(bridgePromise, x, resolve, reject);
                } catch (error) {
                    reject(error)
                }
                //
            }, 0)
        })
    }
    if (self.status === REJECTED) {
        return bridgePromise = new MyPromise(function (resolve, reject) {
            setTimeout(() => {

                try {
                    const x = onRejected(self.error);
                    resolvePromise(bridgePromise, x, resolve, reject);
                } catch (error) {
                    reject(error)
                }
                //
            }, 0)
        })
    }
    //每次then 都需要返回一个promise
}
MyPromise.prototype.catch = function(onRejected){
    return this.then(null,onRejected);
}
MyPromise.deferred  = function(){
    let defer = {};
    defer.promise = new MyPromise(function(resolve,reject){
        defer.resolve = resolve;
        defer.reject = reject;
    })
    return defer;
}

try {
    module.exports = MyPromise;
} catch (error) {
    
}
