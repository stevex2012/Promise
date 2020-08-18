
// getUserId()
// .then(getUserBalanceById)
// .then(function (balance) {
//     // do sth 
// }, function (error) {
//     console.log(error);
// });
// 支持串行异步任务
const PENDING = 'pending';
const FULFILLED = 'fulfiled';
const REJECTED = 'rejected';

function MyPromise(fn) {

    let self = this;
    self.value = null;
    self.error = null;
    // self.onFulfilled = [];
    // self.onRejected = [];
    self.onFulfilledCallbacks = [];
    self.onRejectedCallbacks = [];
    self.status = PENDING; // state 

    function resolve(value) {
        // self.value = value; 获取执行的返回值，并且判断值的类型
        if (self.status === PENDING) {
            setTimeout(function () {
                self.value = value;
                self.status = FULFILLED;
                // [1,2,promise,3]; //保留剩下的
                // doResolve(self.onFulfilledCallbacks,self.value);
                self.onFulfilledCallbacks.forEach(callback=>callback(self.value));
            }, 0)
        }

    }

    function reject(error) {
        if (self.status === PENDING) {
            setTimeout(function () {
                self.error = error;
                self.status = REJECTED;

                self.onRejectedCallbacks.forEach(item => {
                    item(self.error)
                })
            }, 0)
        }
    }

    fn(resolve, reject);
}

function doResolve(fnList, value) {
    for (let i = 0; i < fnList.length; i++) {

        result = fnList[i](value);

        if (result && result.then && typeof result.then === 'function') {//promise 对象
            const resResolveList = fnList.slice(i + 1);
            // result promise 对象 
            result.then(function (data) {
                return doResolve(resResolveList, data);
            });
            break;
        }

    }
}

MyPromise.prototype.then = function (onFulfilled, onRejected) {

    const self = this;
    let bridgePromise = null;

    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;

    onRejected  = typeof onRejected === 'function' ? onRejected : error => { throw error };

    if(self.status === FULFILLED){

    }

    if(self.status === REJECTED ){

    }

    if(self.status === PENDING){
        console.log(PENDING);
        return ()
    }


    if (this.status === PENDING) {

        this.onFulfilledCallbacks.push(onFulfilled);
        this.onRejectedCallbacks.push(onRejected);

    } else if (this.status === FULFILLED) {
        onFulfilled(this.value);
    } else if (this.status === REJECTED) {
        onRejected(this.error);
    }
    return this;

}
MyPromise.prototype.catch = function (onRejected) {
    return this.then(null,onRejected)
}

module.exports = MyPromise;

// new Promise().then();
// .then 不是直接执行 fn执行后的回调 function ，而是一个 把then 的注册 func 保存起来。