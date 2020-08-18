

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
        // self.value = value;
        if (self.status === PENDING) {
            setTimeout(function () {
                self.value = value;
                
                self.onFulfilledCallbacks.forEach(item=>{
                    item(self.value)
                })
            }, 0)
        }

    }

    function reject(error) {
        if (self.status === PENDING) {
            setTimeout(function () {
                self.error = error;
                
                self.onRejectedCallbacks.forEach(item=>{
                    item(self.error)
                })
            }, 0)
        }
    }

    fn(resolve, reject);
}


MyPromise.prototype.then = function (onFulfilled, onRejected) {
    
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

module.exports = MyPromise;

// new Promise().then();
// .then 不是直接执行 fn执行后的回调 function ，而是一个 把then 的注册 func 保存起来。