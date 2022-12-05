/*

1. Promise.prototype.then()
2. Promise.prototype.catch()
3. Promise.prototype.finally()

these are the main part of chaining promise 

these are used to have further action with promise that becomes settled. All these method returns promise we can chained them as well
like
.then(res=>Res)
.catch(err=>err)
.finally(()=>conosle.log(done))


mostly we use this chained promise while fetching data from an api

 */

// The .then() method 

/*

.then method takes two argument as callback function
first argument is callback function for fullfilled the case of promise
second argument is callback function for rejected case
each .then() returns newly generated promise object which can be used for further chaining
*/

const myPromise  =  new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve("done")
        console.log("done")
    },1000)
})

myPromise
.then(handleRejectedA,handleRejectedA)
.then(handleRejectedB,handleRejectedB)
.then(handleRejectedC,handleRejectedC)


/*
when .then() lacks to give response for resolved 
.catch() will be our next step which will give response for rejection callback of promise 

*/

// When we can handle rejection part of promise using then itself then why we have catch function?

/* 
handling a rejected promise in .then() has consequences bcz of which we came to .catch().
Sometimes wwe have to handle error immediately at that time we have no other option then catch 

.catch is similar to .then() just with the callback function for the fulfilled promise 
so mostly .then((resolved, rejected=undefined))
.catch((resolve = undefined, rejected))
*/


