/** Map, Set */

const testSet = new Set();
console.log('Set 생성: ', testSet);

const testSet1 = new Set([1, 2, 3, 3]); // 일부러 중복된 값을 지정해도 하나만 들어간다.
console.log('중복된 값을 지정한 Set: ', testSet1);

const uniqSet = array => [ ... new Set(array) ]; // 매개 변수로 입력된 배열을 Set으로 만들어 중복을 제거하는 함수 선언
console.log('배열을 매개 변수로 받아 입력된 배열의 중복을 제거하는 함수: ', uniqSet([2, 1, 2, 3, 4, 5, 4]));

// const { size } = new Set([1, 2, 3, 3]);
// console.log(size);

const testSet2 = new Set();
testSet2.add(1);
console.log(testSet2);

const testSet3 = new Set([1, 2, 3]);
console.log(testSet3.has(2));

testSet3.delete(2);
console.log(testSet3);

testSet3.clear();
console.log(testSet3);

/**
 * Set은 배열과 유사하고 값의 모음, 컬렉션(데이터의 집합, 그룹)이다.
 * 중복된 값을 허용하지 않는다.
 * 인덱스가 존재하지 않기 때문에 이터레이터를 사용하여 조회한다.
 * 요소 순서에 의미가 없다.
 *
 * - Set 객체에 요소를 추가할 때는 add() 메소드를 사용한다. 연속으로 호출이 가능하다.
 * - 제거할 때는 delete() 메소드를 사용한다. 연속으로 호출이 불가능하다.
 * - 모든 요소를 제거할 때는 clear() 메소드를 사용한다.
 */

// ------------------------------------------------------------------------------------------------------

/** for ... of 문과 forEach() 메소드를 사용하여 Set에 포함된 값을 순회할 수 있다. */

const oddSet = new Set([1, 3, 5, 7, 9]);
let sum = 0;

for(let o of oddSet) {
    sum += o;
}

console.log(sum);

let product = 1;
oddSet.forEach(o => product *= o);
console.log(product);

const userIDs = [101, 102, 101, 103, 102];
const uniqueUserIDS = new Set(userIDs);

uniqueUserIDS.forEach(userID => {
    console.log(`ID: ${ userID }`);
});

const tags = ['JavaScript', 'CSS', 'HTML', 'HTML'];
const uniqueTags = new Set(tags);

uniqueTags.forEach(tag => {
    console.log(`Tag: ${ tag }`);
});

// ------------------------------------------------------------------------------------------------------

/** 스프레드 문법, 배열 디스트럭쳐링 대상 */

const spreadSet = new Set([1, 2, 3]);
console.log([ ... spreadSet ]);

const [something, ... rest] = spreadSet;
console.log(something, rest);

// ------------------------------------------------------------------------------------------------------

/** Set의 합집합, 교집합, 차집합 개념 */

const uniSet1 = new Set([1, 2, 3]);
const uniSet2 = new Set([4, 2, 3]);
let unionSet = new Set([ ... uniSet1, ... uniSet2 ]); // 합집합

let interSect = new Set([ ... uniSet1 ].filter(x => uniSet2.has(x))); // 교집합
console.log(interSect);

let diffeRent = new Set([ ... uniSet1 ].filter(x => !uniSet2.has(x))); // 차집합
console.log(diffeRent);

// ------------------------------------------------------------------------------------------------------

/** 중간 문제 */

/** Set 객체의 요소의 개수를 구하시오 */

const findSize = new Set([ ... 'I am a student' ]); // 문자열 완전 파괴
console.log(findSize);
console.log(findSize.size);

// ------------------------------------------------------------------------------------------------------

/** Map 생성자 */

const newMap = new Map([['key1', 'value1'], ['key2', 'value2']]);
console.log(newMap);

const newMap1 = new Map([[1, 2]]); // Map의 인자로 주어지는 이터러블에 대한 추가 학습 필요. new Map([1, 2]) 의 형태로는 생성이 되지 않는다.
console.log(newMap1);

const newMap2 = new Map([['key1', 'value1'], ['key1', 'value2']]); // 중복된 key 값으로 인해 value가 덮어씌워진다.
console.log(newMap2);
console.log(newMap2.size); // Map의 요소 갯수 확인은 size 프로퍼티를 사용한다.

/** Map 객체에 요소를 추가할 때는 set() 메소드를 사용한다. 연속적으로 호출할 수 있다. */

newMap2.set('key3', 'value3').set('key4', 'value4');
console.log(newMap2);

/** Map 객체는 키의 타입에 제한이 없다. */

const newMap3 = new Map();
const lee = { name: 'lee' };
const kim = { name: 'kim' };

newMap3.set(lee, 'developer').set(kim, 'designer');
console.log(newMap3);

/** delete() 메소드는 삭제 성공 여부를 나타내는 불리언 값을 반환한다. */

console.log(newMap3.delete(kim));
console.log(newMap3);

/** Set처럼 has() 와 clear() 역시 사용한다. clear() 메소드는 언제나 undefined를 반환한다. */

console.log(newMap3.has(lee));
console.log(newMap3.clear()); // undefined

/** forEach() 메소드를 사용하여 내부를 순회할 수 있다. */

let newMap4 = new Map();
newMap4.set(0, 'zero');
newMap4.set(1, 'one');
newMap4.forEach((value, key) => console.log(key, value));

/**
 * Map 객체는 키와 값의 쌍으로 이루어진 컬렉션이다.
 * 키는 중복을 허용하지 않고, value는 중복될 수 있다. 중복된 키를 갖는 요소가 존재하면 값이 덮어씌워진다.
 * Map 생성자 함수는 이터러블을 인수로 전달받아 Map 객체를 생성한다.
 * Map 객체는 키의 타입에 제한이 없다.
 *
 * - Set 객체에 요소를 추가할 때는 add() 메소드를 사용한다. 연속으로 호출이 가능하다.
 * - 제거할 때는 delete() 메소드를 사용한다. 연속으로 호출이 불가능하다.
 * - 모든 요소를 제거할 때는 clear() 메소드를 사용한다. 사용하면 undefined를 반환한다.
 */

// ------------------------------------------------------------------------------------------------------

/** 중간 문제 */

/** Map 객체를 이용하여 세 과목 성적의 합계와 평균을 구하시오 */

const studentMap = new Map([['국어', 85], ['영어', 90], ['수학', 95]]);
let mapSum = 0;

studentMap.forEach((value, key) => {
    mapSum += value;
});

console.log('총점', mapSum, '평균점수', mapSum / studentMap.size);

// ------------------------------------------------------------------------------------------------------

/** 중간 문제 */

/** Map 객체의 요소를 forEach() 메소드로 실행 결과를 만드시오. */

/**
 * title: 유럽 책방 문화 탐구
 * author: 한미화
 * price: 23000
 */

const bookMap = new Map([['title', '유럽 책방 문화 탐구'], ['author', '한미화'], ['price', 23000]]);
console.log(bookMap.forEach((value, key) => console.log(`${key}: ${value}`)));

// ------------------------------------------------------------------------------------------------------

/** 중간 문제 */

/** Set을 이용하여 배열에서 중복 요소를 제거하여 결과를 내시오 */

const dupNumb = [3, 7, 12, 3, 12, 3];

console.log([ ... new Set(dupNumb) ]);

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