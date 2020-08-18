
// 3.我们知道在使用promise时，promise有三种状态:pending（进行中）、fulfilled（已成功）和rejected（已失败）。只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。另外，promise一旦状态改变，就不会再变，任何时候都可以得到这个结果promise对象的状态改变，只有两种可能：从pending变为fulfilled和从pending变为rejected。只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果，如果改变已经发生了，你再对promise对象添加回调函数，也会立即得到这个结果。
const PENDING = 'pending';
const FULFILLED = 'fulfiled';
const REJECTED = 'rejected';

function MyPromise(fn) {


    let self = this;
    self.value = null;
    self.error = null;
    self.onFulfilled = null;
    self.onRejected = null;
    self.status = PENDING; // state 

    function resolve(value) {
        // self.value = value;
        if (this.status === PENDING) {
            setTimeout(function () {
                self.value = value;
                self.onFulfilled(self.value);
            }, 0)
        }

    }

    function reject(error) {
        if (this.status === PENDING) {
            setTimeout(function () {
                self.error = error;
                self.onRejected(self.error);
            }, 0)
        }
    }

    fn(resolve, reject);
}


MyPromise.prototype.then = function (onFulfilled, onRejected) {
    if (this.status === PENDING) {
        this.onFulfilled = onFulfilled;
        this.onRejected = onRejected;
    } else if (this.status === FULFILLED) {
        onFulfilled(this.value);
    } else if (this.status === REJECTED) {
        onRejected(this.error);
    }

}

module.exports = MyPromise;

// new Promise().then();
// .then 不是直接执行 fn执行后的回调 function ，而是一个 把then 的注册 func 保存起来。