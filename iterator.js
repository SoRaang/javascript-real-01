// ------------------------------------------------------------------------------------------------------

/** 이터레이터와 제너레이터 */

/**
 * JavaScript에서 데이터 구조를 순차적으로 탐색하고, 특히 비동기 프로그래밍 및 메모리 관리에서 유용
 * 이터레이터는 데이터 구조를 순회할 수 있는 방법을 제공하고, 필요한 만큼 데이터를 처리할 수 있게 해준다.
 * 제너레이터는 상태를 유지하면서 데이터를 생성할 수 있는 유연성을 제공하며, 비동기 작업을 더 쉽게 처리할 수 있게 해준다.
 */

/**
 * 이터레이터 - 이터레이션 결과를 반환하는 next() 메소드를 갖는 객체이다.
 * 이터레이션 결과는 done과 value 속성을 갖는 객체
 * done - 아직 순회할 수 있는 요소가 남아있는지 여부 => true, false
 * value - 요소가 남아있다면 어떤 요소인지 반환 => 순환할 수 있는 현재 요소
 */

let iterArr = [1, 2, 3, 4, 5];
let iterator = iterArr[Symbol.iterator](); // [Symbol.iterator]() 메소드를 호출하여 이터레이터 객체를 구할 수 있다.
console.log(iterator);

let result = iterator.next(); // 이터레이션 결과 객체 반환
console.log(result);

while(!result.done) { // 배열 요소를 순회하며 요소의 값 출력
    console.log(result.value);
    result = iterator.next();
}

let copy = [ ... iterator ]; // 이터레이터 객체로 배열을 초기화
console.log(copy);

/** 클래스 */

class Sequence {
    constructor(from = 0, to = Infinity, interval = 1) {
        this.from = from;
        this.to = to;
        this.interval = interval;
    }

    [Symbol.iterator]() {
        let next = this.from;
        return {
            next: () => {
                if (next <= this. to) {
                    let result = { value: next, done: false };
                    next += this.interval;
                    return result;
                }

                return { value: undefined, done: true };
            }
        }
    }
}

let evenNumbers = new Sequence(2, 10, 2);
let evIterator = evenNumbers[Symbol.iterator]();
let evResult = evIterator.next();
console.log(evResult);

while(!evResult.done) {
    console.log(evResult.value);
    evResult = evIterator.next();
}

for(let num of evenNumbers) {
    if (num > 7) {
        break;
    }
    console.log(num);
}

// ------------------------------------------------------------------------------------------------------

/**
 * 제너레이터 - 일련의 값을 생성하는 특별한 종류의 순회할 수 있는 객체이다.
 * 배열처럼 이미 객체에 포함되어 있는 요소들을 순회하는 것이 아니라 어떤 연산의 결과로 생성된 값을 순회할 때 유용하다.
 * function* 예약어로 정의된다
 * 이터레이터와 마찬가지로 while() 문, for ... of 문, [Symbol.iterator]() 메소드를 사용할 수 있다.
 */

function* generate() {
    console.log('제너레이터 실행');
    console.log('1 생성');
    yield 1;
    console.log('2 생성');
    yield 2;
    console.log('3 생성');
    yield 3;
}

let gen = generate();
let genResult = gen.next();
genResult = gen.next();

while(!genResult.done) {
    console.log(genResult.value);
    genResult = gen.next();
}

for(let ge of gen) {
    console.log(ge);
}

let geIterator = gen[Symbol.iterator]();
console.log(geIterator);

/** while(), for ... of, [Symbol.iterator]() */

function* genSequence(from = 0, to = Infinity, interval = 1) {
    let next = from;
    while(next <= to) {
        yield next;
        next += interval;
    }
}

let evenSeq = genSequence(2, 10, 2); // 시작 숫자가 2고 간격이 2 이므로 짝수만 생성된다.
for(let seq of evenSeq) {
    console.log(seq);
}

// ------------------------------------------------------------------------------------------------------

/** [Symbol.iterator]() 메소드를 제네레이터 메서드로 구현하여 제네레이터 객체를 반환하는 클래스 */

class GenSeq {
    constructor(from = 0, to = Infinity, interval = 1) {
        this.from = from,
        this.to = to,
        this.interval = interval
    }

    *[Symbol.iterator]() {
        let num = this.from;
        while(num <= this.to) {
            yield num;
            num += this.interval;
        }
    }
}

let evenNumbs = new GenSeq(2, 10, 2);

console.log('클래스에서 이터레이터로 반복문 생성');

for(let n of evenNumbs) {
    console.log(n);
}

// ------------------------------------------------------------------------------------------------------

/** flat() 메소드처럼 여러 개의 순회할 수 있는 객체를 펼쳐서 각 요소를 순차적으로 생성하는 제네레이터 함수 */

function* generateIterables( ... iterables ) {
    for(let iterable of iterables) {
        for(let item of iterable) {
            yield item;
        }
    }
}

/** for 문을 중첩하여 사용하는 대신 yield* 형태의 제네레이터 함수로 사용할 수 있다. */

console.log('중첩된 객체 펼치기')

let generator = generateIterables('abc', [1, 2, 3]);
let genArr = [ ... generator ];

console.log(genArr);