/** Map, Set */

const testSet = new Set();
console.log('Set 생성: ', testSet);

const testSet1 = new Set([1, 2, 3, 3]); // 일부러 중복된 값을 지정해도 하나만 들어간다.
console.log('중복된 값을 지정한 Set: ', testSet1);

const uniqSet = array => [ ... new Set(array) ]; // 매개 변수로 입력된 배열을 Set으로 만들어 중복을 제거하는 함수 선언
console.log('배열을 매개 변수로 받아 입력된 배열의 중복을 제거하는 함수: ', uniqSet([2, 1, 2, 3, 4, 5, 4]));

const { size } = new Set([1, 2, 3, 3]);
console.log(size);

const testSet2 = new Set();
testSet2.add(1);
console.log(testSet2);

const testSet3 = new Set([1, 2, 3]);
console.log(testSet3.has(2));

testSet3.delete(2);
console.log(testSet3);

testSet3.clear();
console.log(testSet3);

/** for ... of 문과 forEach() 메소드를 사용하여 포함된 값을 순회할 수 있다. */

const oddSet = new Set([1, 3, 5, 7, 9]);
let sum = 0;

for(let o of oddSet) {
    sum += o;
}

console.log(sum);

// ------------------------------------------------------------------------------------------------------

const products = 1;
oddSet.forEach(o => products * o);
console.log(products);

/**
 * Set은 배열과 유사하고 값의 모음, 컬렉션(데이터의 집합, 그룹)이다.
 * 중복된 값을 허용하지 않는다.
 * 인덱스가 존재하지 않기 때문에 이터레이터를 사용하여 조회한다.
 * 요소 순서에 의미가 없다.
 *
 * - Set 객체에 요소를 추가할 때는 add() 메소드를 사용한다. 연속으로 호출이 가능하다.
 * - 제거할 때는 delete() 메소드를 사용한다. 연속으로 호출이 불가능하다.
 * - 모든 요소를 제거할 때는 clear() 메소드를 사용한다.
 *
 * Map은 key & value 구조이다.
 * key는 중복을 허용하지 않고, value는 중복될 수 있다.
 */