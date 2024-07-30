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
console.log(a);

/**
 * 배열의 길이를 알 수 있는 .length 는, a.length = 0; 식으로 사용하여 배열에서 요소를 삭제할 수도 있다.
 */

// ------------------------------------------------------------------------------------------------------

/** 배열의 구조 해체 */

let jan, fab, mar, rest;

[jan, fab, mar, ... rest] = carSales;

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

// ------------------------------------------------------------------------------------------------------

const car = {
    maker: 'BMW',
    color: 'red',
    year: '2012'
}

for(let prop in car) {
    console.log(prop); // 객체 내의 키를 반환한다.
}