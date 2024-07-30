/** 배열 선언 방법 */

const me = [1, 2, 3, 4, 5];
console.log(me);

let carSales = [300, 350, 400, 450, 500, 600, 650, 620, 580, 620, 500, 450];
console.log('객체 리터럴로 생성: ', carSales);

let carSales2 = new Array(300, 350, 400, 450, 500, 600, 650, 620, 580, 620, 500, 450); // 위와 같은 결과가 나온다.
console.log('배열 생성자로 생성: ', carSales2);

let carSales3 = new Array(12); // 텅 빈 12개 길이의 배열이 생성된다.
console.log('배열 생성자에 길이만 넣어 생성: ', carSales3);

/**
 * 배열 생성은 let a = new Array(요소, 요소, 요소) 또는 new Array(배열 길이) 식으로도 가능하다.
 */

// ------------------------------------------------------------------------------------------------------

/** 배열의 얕은 복사 */

let copy = Array.from(carSales); // 대상 배열로부터 복사해온 새로운 배열을 만든다.
console.log('Array.from(): ', copy);

let concat = [0, ... carSales, 300, 500]; // 확산 연산자를 사용한 배열 만들기. 전개 순서에 따라 0, 기존 배열, 300, 500이 추가된다
console.log('확산 연산자에 기존 배열을 삽입하여 생성: ', concat);

let concats = [ ... "01234567890" ]; // 확산 연산자를 문자열에 사용하면 문자열 또한 확산된다.
console.log('문자열에 확산 연산자 사용: ', concats);

/**
 * 기존 배열의 요소를 복사해온 것이기 때문에 복사본 배열을 수정해도 원래 배열에는 영향을 끼치지 않는다.
 */

// ------------------------------------------------------------------------------------------------------

/** 배열 요소 접근 */

let may = carSales[4];
console.log(may);

let june = carSales['5'];
console.log(june);

carSales[12] = -50; // 배열에 존재하지 않는 인덱스의 값을 변경하면, 해당 인덱스에 값이 추가된다.
console.log('배열에 없는 인덱스에 접근: ', carSales);

let a = [1, 2, 3, 4, 5];
let len = a.length;

a.length = 0;
console.log('배열의 길이를 0으로 만들어 삭제: ', a);

/**
 * 배열의 길이를 알 수 있는 .length 는, a.length = 0; 식으로 사용하여 배열에서 요소를 삭제할 수도 있다.
 */

// ------------------------------------------------------------------------------------------------------

/** 배열의 구조 해체 */

let jan, fab, mar, rest;

[jan, fab, mar, ... rest] = carSales; // 배열에 순서대로 변수를 지정한다. 확산 연산자를 통해 나머지 길이를 새로운 배열로 지정한다.

console.log(jan, fab, mar);
console.log(rest);

// ------------------------------------------------------------------------------------------------------

/** for ... of */

let sum = 0;

for(let sale of carSales) {
    sum += sale;
}

let average = sum / carSales.length;
let roundedAverage = average.toFixed(2);
console.log(roundedAverage);

// ------------------------------------------------------------------------------------------------------

/** entries() 메소드 */

let sum2 = 0;

for(let [index, sale] of carSales.entries()) {
    if (index % 2 === 0)
        sum2 += sale;
}

let average2 = sum2 / (carSales.length / 2);
console.log(average2);

// ------------------------------------------------------------------------------------------------------

/** for ... of 와 for ... in 의 차이 */

let list = [4, 5, 6];

for(let i in list) {
    console.log(i); // list 배열의 3개 요소가 가진 키인 인덱스를 반환한다.
}

for(let i of list) {
    console.log(i); // list 배열의 3개 요소가 가진 값을 반환한다.
}

/**
 * for ... in 은 키의 목록을 반환하고, for ... of 는 값을 반환한다.
 * for ... in 루프는 순서 없이 객체의 모든 열거 가능한 속성을 반복한다.
 */

const car = {
    maker: 'BMW',
    color: 'red',
    year: '2012'
}

for(let prop in car) {
    console.log(prop); // 객체 내의 키를 반환한다.
}

// for(let prop of car) { // for ... of 를 일반 객체에 사용할 경우, iterable이 아니므로 오류가 출력된다.
//     console.log(prop);
// }

// ------------------------------------------------------------------------------------------------------

/** forEach() */

let sum3 = 0;

carSales.forEach(sale => { sum3 += sale });

let average3 = sum3 / carSales.length;
console.log(average3);

carSales.forEach((sale, index, array) => { array[index] = sale + 50 }); // 여기서 매개 변수로 사용된 index, array는 배열의 기본 변수이다. MDN 참조.
console.log(carSales);

/**
 * 배열에서 각 요소를 순회하면서 함수를 호출하여 각 요소를 다룬다.
 * 새로운 배열을 반환하지 않는다.
 */

// ------------------------------------------------------------------------------------------------------

/** map() */

let newCarSales = carSales.map(sale => sale + 50);
console.log(newCarSales);
console.log(carSales); // map() 메소드에 의해서는 기존 배열은 바뀌지 않는다.

/**
 * 배열에서 각 요소를 순회하면서 함수를 호출, 새로운 배열을 생성하여 반환한다.
 * forEach() 와는 새로운 배열이 생성되는 것이 다르다.
 */

/** filter() */

let highSales = carSales.filter(sale => sale > 500); // 비교 조건식에 의해 500 이상의 요소만 새로운 배열로 반환된다.
console.log(highSales);

/**
 * 배열에서 각 요소를 순회하면서 함수를 호출, 새로운 배열을 생성하여 반환한다.
 * forEach() 와는 새로운 배열이 생성되는 것이 다르다.
 */

let evenSales = carSales.filter((sale, index) => index % 2 === 1); // index 값에 따라 짝수 월의 값만 새로운 배열로 반환된다.
console.log(evenSales);

// ------------------------------------------------------------------------------------------------------

/** find() / findIndex() */

let saleFind = carSales.find(sale => sale > 600);
console.log(saleFind); // 배열에서 비교 조건식에 부합하는 첫 번째 요소의 값을 찾아 반환한다.

let saleFind2 = carSales.findIndex(sale => sale > 600);
console.log(saleFind2); // 배열에서 비교 조건식에 부합하는 첫 번째 요소의 인덱스를 찾아 반환한다.

/**
 * find() : 배열에서 비교 조건식에 부합하는 첫 번째 요소의 값을 찾아 반환한다.
 * findIndex() : 배열에서 비교 조건식에 부합하는 첫 번째 요소의 인덱스를 찾아 반환한다.
 */

/** every() */

let firstSaleSix = carSales.every(sale => sale > 600);
console.log(firstSaleSix); // 배열 내의 모든 값이 600 이상은 아니기 때문에 불일치하는 첫 번째 값에서 즉시 false를 반환한다.

/**
 * 모든 배열 요소에 대한 조건 연산에서 true, false의 결과 반환
 */

/** some() */

let anySaleSix = carSales.some(sale => sale > 600);
console.log(anySaleSix); // 배열 내에 600 이상인 값이 하나 이상 존재하기 때문에 일치하는 첫 번째 값에서 즉시 true를 반환한다.

/**
 * 모든 배열 요소에서 하나라도 참 또는 거짓을 반환하는 경우 결과 반환
 */

/** reduce() */

let sum4 = carSales.reduce((t1, t2) => t1 + t2, 0); // (이전까지의 누적값, 현재 값, array) => 조건식, 초기 값. MDN 참조.
console.log(sum4); // 배열 내의 모든 값을 조건식에 따라 덧셈한 값을 반환한다.

let highest = carSales.reduce((t1, t2) => { return t1 > t2 ? t1 : t2 });
console.log(highest);

/**
 * 더이상 배열 요소가 없을 때까지 함수를 반복하여 하나의 값을 반환
 */

// ------------------------------------------------------------------------------------------------------

/** flat() */

let flat = [1, [2, 3]].flat();
console.log(flat);

/**
 * 배열 요소에 다른 배열을 포함하고 있을 때, 배열을 풀어준다.
 * 단, 포함된 배열이 또다른 배열을 포함하고 있을 경우에는 풀어주지 못한다.
 */

/** flatMap() */

let message = ['오늘은', '비가 옵니다'];
let words = message.flatMap(msg => msg.split(''));
console.log(words);

/**
 * 배열의 각 요소에 주어진 콜백 함수를 적용한 다음, 그 결과를 한 단계씩 평탄화하여 새 배열로 반환
 */

// ------------------------------------------------------------------------------------------------------

/** concat() */

const array1 = ['a', 'b', 'c'];
const array2 = ['d', 'e', 'f'];
const array3 = array1.concat(array2);
console.log(array3);

let original = [1, 2, 3];
let newArray;
newArray = original.concat(4, 5);
newArray = original.concat([4, 5], [6, 7]);
console.log(newArray);

/**
 * 두 개 이상의 배열을 병합하는 데 사용
 * 기존 배열을 변경하지 않고, 새 배열을 반환
 */

// ------------------------------------------------------------------------------------------------------

/** push(), pop() */

let stack = [];
stack.push(1);
stack.push(2, 3);
console.log('push(): ', stack);

stack.pop();
console.log('pop(): ', stack);

stack.push(4);
console.log('pop() 이후에 다시 push(): ', stack);

/**
 * push() : 배열의 끝에 요소를 추가
 * pop() : 배열의 끝에 있는 요소를 꺼내와 반환하고, 해당 요소를 배열에서 삭제
 */

/** unshift(), shift() */

stack.unshift(1);
stack.unshift(2, 3);
console.log('unshift(): ', stack);

stack.shift();
console.log('shift(): ', stack);

/**
 * unshift() : 배열의 처음에 요소를 추가
 * shift() : 배열의 처음에 있는 요소를 꺼내와 삭제
 */

// ------------------------------------------------------------------------------------------------------

/** 중간 문제 */

/** 배열 numbers 에서 document.write 를 이용하여 37, 32를 결과값으로 나오게 작성 */

const numbers = [20, 37, -21, 32, -2];

document.write(`${numbers[1]}, ${numbers[3]}`); // 기본 답변

document.write(numbers.filter(a => { return a > 30 })); // 내 답변

// ------------------------------------------------------------------------------------------------------

/** slice(), splice() */