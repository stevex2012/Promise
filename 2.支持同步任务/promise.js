//为什么呢？因为是同步任务，所以当我们的promise实例reslove时，它的then方法还没执行到，所以回调函数还没注册上，这时reslove中调用成功回调肯定会报错的。

//只要在 执行 resolve 的时候，then 方法上的函数已经执行注册
function MyPromise(fn) {

    let self = this;
    self.value = null;
    self.error = null;
    self.onFulfilled = null;
    self.onRejected = null;

    function resolve(value) {
        // self.value = value;
        setTimeout(function () {
            self.value = value;
            self.onFulfilled(self.value);
        }, 0)
    }

    function reject(error) {
        // self.error = error;
        setTimeout(function () {
            self.error = error;
            self.onRejected(self.error);
        }, 0);
    }

    fn(resolve, reject);
}


MyPromise.prototype.then = function (onFulfilled, onRejected) {
    this.onFulfilled = onFulfilled;
    this.onRejected = onRejected;
}

module.exports = MyPromise;

// new Promise().then();
// .then 不是直接执行 fn执行后的回调 function ，而是一个 把then 的注册 func 保存起来。