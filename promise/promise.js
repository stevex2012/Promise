// promise A+ 

//promise pending , resolved/rejected; 
//链式调用 每次 then 都返回一个 新的 promise
//接受一个 function 作为参数
//异步编程 当 resolve/reject 的时候在执行 then 回调
// then 
// promise statues
const PENDING = 'pending';
const RESOLVED = 'resolved';
const REJECTED = 'rejected';

function MyPromise(fn) {
    //注册，就需要 数组/对象。
    const self = this;
    //promise status
    self.status = PENDING;
    //成功的值
    self.value = null;
    //失败值
    self.error = null;
    //resolve 回调队列
    self.onResolvedFns = [];
    //reject 回调队列
    self.onRejectedFns = [];
    function resolve(value) {
        //t
        if (self.status === PENDING) {
            self.value = value;
            self.status = RESOLVED;
            self.onResolvedFns.forEach(fn => fn(self.value))
        }

    }
    function reject(error) {
        if (self.status === PENDING) {
            self.error = error;
            self.status = REJECTED;
            self.onRejectedFns.forEach(fn => fn(self.error))
        }
    }
    fn(resolve, reject);
}
function doReslut(result, resolve, reject,nextPromise) {
    if (result instanceof MyPromise) {//promse object 知道result 没有 promise 对象 
        if (result.status === PENDING) {
            // 
            result.then((y)=>{
                // const y = resolve(result)
                doReslut(y,resolve, reject)
            },()=>{

            })
        } else {
            result.then(resolve, reject)
        }
    } else {
        resolve(result);
    }
}
// 作用：注册回调函数
MyPromise.prototype.then = function (onResolved, onRejected) {
    const self = this;
    let nextPromise = null;
    //then 方法执行时候，promise 可以是以下 3 种状态之一
    onResolved = typeof onResolved === 'function' ? onResolved : val => val;
    onRejected = typeof onRejected === 'function' ? onRejected : error => { throw error };
    if (self.status === PENDING) {
        //需要知道 函数执行后的返回结果
        return nextPromise = new MyPromise((resolve, reject) => {
            self.onResolvedFns.push(value => {
                const reslut = onResolved(self.value);
                doReslut(reslut, resolve, reject,nextPromise);
            });
            self.onRejectedFns.push((onRejected));
        })
    }
    if (self.status === RESOLVED) {
        onResolved(self.value);
        return nextPromise = new MyPromise((resolve, reject) => {
            const reslut = onResolved(self.value);
            doReslut(reslut, resolve, reject);
        })
    }
    if (self.status === REJECTED) {

        return nextPromise = new MyPromise((resolve, reject) => {
            const reslut = onRejected(self.error);
            doReslut(reslut, resolve, reject);
        })
    }
}
MyPromise.prototype.catch = function (error) {

}
module.exports = MyPromise;

// new Promise(function(resolve,reject){
//     resolve
// }).then(val=>val,error=>error)