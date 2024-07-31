/** 동기식 / 비동기식 */

/**
 * 동기 - 해당 작업이 끝날 때까지 다른 작업을 시작하지 않고, 해당 작업이 끝난 뒤에 새로운 작업을 시작하는 방식 (직렬형)
 * 비동기 - 하나의 작업이 끝나기 전에 다른 새로운 작업을 시작할 수 있음 (병렬형)
 * 콜백 함수, 프로미스, async/await로 비동기식 코드를 작성할 수 있다.
 * 콜백 함수는 다른 함수의 인자로 넘겨져 해당 함수가 처리된 후 호출되는 함수 (setTimeout 처럼)
 */

// function callback() {
//     console.log('콜백 함수가 호출됨');
// }

// setTimeout(callback, 1000);
// console.log('작업을 수행함'); // 코드 작성 순서와 상관없이 실행되는 것을 알 수 있다.

// ------------------------------------------------------------------------------------------------------

/** 기초적인 비동기식 코드 작성법 */

// function getUsers(callback) {
//     setTimeout(() => {
//         callback([
//             { name: 'Kim', email: 'kim@gmail.com' },
//             { name: 'Lee', email: 'lee@hotmail.com' },
//             { name: 'Park', email: 'park@naver.com' },
//         ]);
//     }, 1000);
// }

// function findUser(name, callback) {
//     getUsers(users => {
//         const user = users.find(user => user.name === name);
//         callback(user.email);
//     });
// }

// console.log('비동기식 코드');
// findUser('Kim', console.log);

// ------------------------------------------------------------------------------------------------------

/** Promise */

let success = true;

function getUser() {
    return new Promise((resolve, reject) => {
        if (success) {
            setTimeout(() => {
                resolve(
                    [
                        { name: 'Kim', email: 'kim@gmail.com' },
                        { name: 'Lee', email: 'lee@hotmail.com' },
                        { name: 'Park', email: 'park@naver.com' },
                    ]
                )
            }, 1000);
        } else {
            reject('실패');
        }
    });
}

let promise = getUser();
promise
    .then(users => users.find(user => user.name === 'Kim'))
    .then(user => console.log(user.email)) // 성공했을 때의 작동
    .catch(error => console.error(error)) // 실패했을 때의 작동
    .finally(() => console.log('작업 완료')); // 성공 / 실패 여부와 상관없이 항상 작동

/**
 * 비동기 연산의 결과를 표현하는 객체 (최종 성공 또는 실패를 나타냄)
 * 작업 중 (pending) - 비동기 연산 진행 중
 * 완료됨 (fulfilled) - 비동기 연산의 결과에 따라 나타나는 상태
 * 거부됨 (rejected) - 비동기 연산의 결과에 따라 나타나는 상태
 */

// ------------------------------------------------------------------------------------------------------

/** 병렬 Promise */

const p1 = new Promise((resolve, reject) => setTimeout(() => resolve(10), 2000));
const p2 = new Promise((resolve, reject) => setTimeout(() => reject('실패'), 1000));
const p3 = new Promise((resolve, reject) => setTimeout(() => resolve(30), 3000));
let promises = [p1, p2, p3];

// Promise.all(promises) // .all() 메소드는 주어진 모든 Promise가 이행된 후, 혹은 Promise가 주어지지 않았을 때 이행하는 Promise를 반환한다. 주어진 Promise 중 하나가 거부하는 경우, 첫 번째로 거부한 Promise의 이유를 사용하여 자신도 거부한다.
//     .then(results => {
//         const total = results.reduce((s, r) => s + r);
//         console.log(`결과: ${results}`);
//         console.log(`합계: ${total}`);
//     });

Promise.allSettled(promises) // .allSettled() 메소드는 주어진 모든 Promise가 이행되거나 거부된 후, 각 Promise에 대한 결과를 나타내는 객체 배열을 반환한다. 서로의 성공 여부에 관련 없는 여러 비동기 작업을 수행하거나, 항상 각 Promise의 실행 결과를 알고 싶을 때 사용한다.
    .then(results => {
        const fulfilledResults = results.filter(result => result.status === 'fulfilled')
        .map(result => result.value);

        const total = fulfilledResults.reduce((sum, value) => sum + value, 0);
        console.log(`결과: ${fulfilledResults}`);
        console.log(`합계: ${total}`);
    });

/**
 * 여러 비동기 연산을 병렬로 동시에 수행하고, 각 비동기 연산의 결과를 하나로 모으는 작업을 수행할 수 있다.
 */

// ------------------------------------------------------------------------------------------------------

/** 순차 Promise */

function getUser2() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve([
            { name: "Kim", email: "kim@gmail.com" },
            { name: "Lee", email: "lee@hotmail.com" },
            { name: "Park", email: "park@naver.com" },
            ]);
        }, 2000);
    });
}

function findUser2(users) {
    return new Promise((resolve, reject) => {
        console.log(users);
        setTimeout(() => {
            resolve(users.find((user) => user.name === "Kim"));
        }, 1000);
    });
}

function getEmail2(user) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('순차 Promise 결과: ' + user.email);
        }, 3000);
    });
}

getUser2() // 객체 배열
    .then(findUser2) //findUser([{ name: "Kim", email: "kim@gmail.com" },{ name: "Lee", email: "lee@hotmail.com" },{ name: "Park", email: "park@naver.com" },])
    .then(getEmail2) //getEmail({ name: "Kim", email: "kim@gmail.com" })
    .then(console.log); //result: "kim@gmail.com"

/**
 * .then() 메소드 체인을 이용하여 비동기 연산을 수행하는 함수를 순차적으로 실행할 수 있다.
 */

// ------------------------------------------------------------------------------------------------------

/** 순차 Promise */

/**
 * Promise.race() 메소드는 이터러블에 포함된 Promise들 중 가장 먼저 성공 또는 실패한 결과를 반환한다.
 */

// ------------------------------------------------------------------------------------------------------

/** 중간 문제 */

/** 1초 후에 A를, 2초 후에 B를 출력하는 두 개의 Promise를 생성하고, 두 Promise가 모두 완료된 후에 "완료!"를 출력하시오  */

const promA = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('A');
    }, 1000);
});

const promB = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('B');
    }, 2000);
});

let proms = [promA, promB];
Promise.all(proms)
    .then((results) => {
        console.log('완료!', results);
    });

// ------------------------------------------------------------------------------------------------------

/** 중간 문제 */

/** 1초 후에 숫자 5를 반환하는 Promise와 1.5초 후에 그 숫자에 10을 곱한 값을 반환하는 Promise를 작성하시오. 만약 5를 반환하는 Promise가 실패하면 "에러!"를 출력하시오 */

let doIever = true;

function prom5Sec() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (doIever) {
                resolve(5);
            } else {
                reject('에러!');
            }
        }, 1000);
    });
};

function promAfter(n) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(n * 10);
        }, 1500);
    });
}

prom5Sec()
    .then(promAfter)
    .then(console.log)

// ------------------------------------------------------------------------------------------------------

/** async / await */

/**
 * 비동기식 코드를 마치 동기식 코드인 것처럼 읽기 쉽게 작성.
 * async, await 예약어를 사용한다.
 */

// ------------------------------------------------------------------------------------------------------

/** async */

async function sayHello() {
    return '안녕하세요!';
}

let sayHello2 = async function() {
    return '안녕하세요! 2';
}

let sayHello3 = async () => {
    return '안녕하세요! 3';
}

sayHello()
    .then(console.log);

class Greeter {
    async sayHello4() {
        return '안녕하세요! 4';
    }
}

const greeter = new Greeter();
greeter.sayHello4()
    .then(console.log);

async function sayHello5() {
    return Promise.resolve('안녕하세요! 5');
}

sayHello5()
    .then(console.log);

async function sayHello6() {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve('안녕하세요! 6'));
    });
}

sayHello6()
    .then(console.log);

/**
 * 비동기 연산을 처리하는 함수를 정의하는 데 사용한다.
 * function 앞에 쓴다.
 * 함수 표현식, 화살표 함수, 클래스 메소드 등에 사용 가능
 * 명시적으로 Promise 객체를 반환할 수 있다.
 */

// ------------------------------------------------------------------------------------------------------

/** await */

async function speakHello() {
    return new Promise((resolve, reject) => {
        setTimeout(() => reject('거부'), 1000);
    });
}

async function showIt() {
    try {
        let result = await speakHello();
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}

showIt();

/**
 * Promise 객체가 완료됨 상태가 되거나 거부됨 상태가 될 때까지 기다릴 수 있다.
 * 항상 async 예약어가 지정된 함수 안에서만 사용할 수 있다.
 */

// ------------------------------------------------------------------------------------------------------

/** async / await 순차적 Promise처럼 만들기 */

function getUser3() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve([
                { name: "Kim", email: "kim@gmail.com" },
                { name: "Lee", email: "lee@hotmail.com" },
                { name: "Park", email: "park@naver.com" },
            ]);
        }, 2000);
    });
}

function findUser3(users, name) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(users.find(user => user.name === name));
        }, 1000);
    });
}

function getEmail3(user) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(user.email)
        }, 3000);
    });
}

async function getUserEmail(name) {
    let users = await getUser3();
    let user = await findUser3(users, name);
    let email = await getEmail3(user);
    return email;
}

async function showUserEmail() {
    let email = await getUserEmail('Park');
    console.log('async / await 결과: ' + email);
}

showUserEmail();

// ------------------------------------------------------------------------------------------------------

/** 제네레이터와 Promise를 함께 사용하여 마치 동기 코드처럼 느껴지게 비동기 코드를 작성할 수 있다. */

const myPromise = () => new Promise((resolve, reject) => {
    resolve('Value is ');
});

function* gen() {
    let result = '';
    yield myPromise().then(data => { result = data });
    yield result + '1';
}

const asyncFunc = gen();
const val1 = asyncFunc.next();
console.log(val1);

val1.value.then(() => {
    console.log(asyncFunc.next());
});

// ------------------------------------------------------------------------------------------------------

function* asyncSeq(from = 0, to = Infinity, interval = 1, timeout = 1000) {
    let next = from;
    while(next <= to) {
        yield new Promise((resolve, reject) => {
            setTimeout(() => resolve(next), timeout);
        });
        next += interval;
    }
}

(async() => {
    let seq = asyncSeq(2, 10, 2);
    for await (let value of seq) console.log(value);
})();

// ------------------------------------------------------------------------------------------------------

/** 중간 문제 */

/** 제네레이터를 사용하여 여러 비동기 작업을 순차적으로 실행하는 함수를 작성하시오. 각 작업은 2초 후에 완료된다고 가정하고, 작업이 완료될 때마다 결과물을 출력해야 합니다. 제네레이터는 작업이 완료될 때마다 다음 작업을 실행해야 합니다. */

function* doItSeq(from = 0, to = Infinity, interval = 1, timeout = 2000) { // 내 답안
    let next = from;
    while(next <= to) {
        yield new Promise((resolve, reject) => {
            setTimeout(() => resolve(
                `${next}번째 작업 완료`
            ), timeout);
        });
        next += interval;
    }
}

// (async() => {
//     let doSeq = doItSeq(1, 15, 1);
//     for await (let value of doSeq) console.log(value);
// })();

function* taskGenerator() { // 원래 답안
    yield new Promise((resolve) => setTimeout(() => resolve('1번 작업 완료'), 2000));
    yield new Promise((resolve) => setTimeout(() => resolve('2번 작업 완료'), 2000));
    yield new Promise((resolve) => setTimeout(() => resolve('3번 작업 완료'), 2000));
}

const showTasks = async () => {
    const tasks = taskGenerator();
    for(let task of tasks) {
        const result = await task;
        console.log(result);
    }
}

showTasks();

// ------------------------------------------------------------------------------------------------------

/** 중간 문제 */

/** 사용자 정보를 가져오는 비동기 함수를 작성하고, 이를 async / await를 사용하여 호출하시오. */

function userData(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const users = {
                1: { name: 'Kim', age: 25 },
                2: { name: 'Sagong', age: 30 },
                3: { name: 'Park', age: 35 }
            }
            const user = users[userId];

            if (user) {
                resolve(user);
            } else {
                reject('사용자를  찾을 수 없습니다.');
            }
        }, 1000);
    });
}

async function showUser(userId) {
    const matchUser = await userData(userId);

    try {
        console.log(`showUser: ${matchUser.name}, ${matchUser.age}`);
    } catch(error) {
        console.error(error);
    }
}

showUser(2);

// ------------------------------------------------------------------------------------------------------