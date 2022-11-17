/* A promises is said to be settled if it is either fulfilled or rejected, but not pending.

// promise has two main 1. fullfilled 2. rejected 
    but sometime we hear the word called as resolved which basically means that the promise is settled or locked in to match the eventual 
    state of another promise and further resolving or rejecting has no effect on it.



*/

// for example

// Promise is a function with two callback function (resolved and rejecte)

new Promise((resolveOutSide)=>{
    // here resolveoutSide is like a callback function
    // resolveOutSide will execute instantly on call of this promise function
    resolveOutSide(
        new Promise((resolveInside)=>{
            setTimeout(resolveInside,1000)
        })
    )

})

// this promise is already resolved on call of this promise (bcz resolveOutSide is called synchronously) but it is resolved
// with another promise so it will get fulfilled after a second.
