/* ============================== Phase 1 ============================== */
/* -------------------------- exploring async -------------------------- */
/*
function num1() {
    return 1
}

async function num2() {
    return 2
}

console.log('num1', num1());
console.log('num2', num2());

num2().then(result => console.log(result));


/* ============================== Phase 2 ============================== */
/* -------------------------- exploring await -------------------------- */
/*
async function waiting() {
    const value = await num2();
    console.log('waiting', value);
}

waiting();

 

/* ============================== Phase 3 ============================== */
/* --------------------- creating a custom Promise --------------------- */
/*
const promise = new Promise((resolve) => {
    setTimeout(() => {
        resolve('done !!!');
    }, 1500)
});


async function waitForMyPromise() {
 

    const result = await promise;
    console.log('my promise is', result);
}

waitForMyPromise();



/* ============================== Phase 4 ============================== */
/* -------------------------- exploring then --------------------------- */
/*
// Your code here
const promise2 = new Promise((resolve) => {
    setTimeout(() => {
        resolve('done!');

    }, 1000)
});

promise2.then(r => console.log('then my promise is ', r));



/* ============================== Phase 5 ============================== */
/* ------------------- turn setTimeout into a Promise ------------------ */

const wait = (ms) => {
    return new Promise(res => setTimeout(res, ms))
};
/*
wait(2000).then(r => console.log('after 2000 ms...'));

async function letsWait() {
    await wait(4000);
    console.log('after 2000 ms but with async....');
    return 2;
}

console.log(letsWait());


/* ============================== Phase 6 ============================== */
/* -------------------- exploring reject and .catch -------------------- */

const tryRandomPromise = (random) => new Promise ((res, rej) => {
    if (random > 0.5) {
        res('success!!!');
    } else {
        rej('random error');
    }
});

const tryRandoms = n => {
    for (let i = 1; i <=n; i++) {
        const random = Math.random();
        wait(2000 + random*1000)
            .then(r => tryRandomPromise(random))
            .then(r => console.log('random try #',i, r))
            .catch(e => console.log('random try #',i, e));
    }
}

tryRandoms(10);

/* ============================== Phase 7 ============================== */
/* ---------------- exploring async/await and try/catch ---------------- */

// Your code here

async function tryAgain(i) {
    const random = Math.random();
    await wait(3000 + random*1000);
    try {
        const r = await tryRandomPromise(random);
        console.log('random again #', i, r);
    } catch (e) {
        console.log('random again #i', i, e);
    }
}

for (let i = 0; i < 10; i ++) {
    tryAgain(i);
}



/* ============================== Phase 8 ============================== */
/* -------------------- Promises are asynchronous! --------------------- */

// Your code here
console.log('End of the program!');