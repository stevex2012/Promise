# Promise
手写promiseA+ 规范
1. 基础版本

可以创建promise对象实例。
promise实例传入的异步方法执行成功就执行注册的成功回调函数，失败就执行注册的失败回调函数。

2.同步任务
//为什么呢？因为是同步任务，所以当我们的promise实例reslove时，它的then方法还没执行到，所以回调函数还没注册上，这时reslove中调用成功回调肯定会报错的。

//只要在 执行 resolve 的时候，then 方法上的函数已经执行注册

3.我们知道在使用promise时，promise有三种状态:pending（进行中）、fulfilled（已成功）和rejected（已失败）。只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。另外，promise一旦状态改变，就不会再变，任何时候都可以得到这个结果promise对象的状态改变，只有两种可能：从pending变为fulfilled和从pending变为rejected。只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果，如果改变已经发生了，你再对promise对象添加回调函数，也会立即得到这个结果。

目的：
    实现promise的三种状态。
    实现promise对象的状态改变，改变只有两种可能：从pending变为fulfilled和从pending变为rejected。
    实现一旦promise状态改变，再对promise对象添加回调函数，也会立即得到这个结果。

4.支持链式操作

我们平时写promise一般都是对应的一组流程化的操作，如这样：
promise.then(f1).then(f2).then(f3)
但是我们之前的版本最多只能注册一个回调，这一节我们就来实现链式操作。

目的：
    使promise支持链式操作

5.支持串行异步任务

但是我们平常用promise，then方法里一般是异步任务，因为我们用promise主要用来解决一组流程化的异步操作，如下面这样的调取接口获取用户id后，再根据用户id调取接口获取用户余额，获取用户id和获取用户余额都需要调用接口，所以都是异步任务，如何使promise支持串行异步操作呢?

目的：
    使promise支持串行异步操作