/** DOM API */

/**
 * Document Object Model / Application Programming Interface
 * JavaScript에서 HTML 문서를 제어하기 위해 사용하는 프로퍼티와 메소드 등
 * <head>에서 불러온 <script>는 DOM이 생성되기 전에 작동하므로 DOM에 직접 관여할 수 없다.
 * <script defer>, <script async> 등으로 DOM의 생성 이후에 작동하도록 해야 한다.
 */

const myDiv = document.getElementById('myDiv');
const btnClick = document.getElementById('btnClick');

function changeContent() {
    myDiv.innerHTML = '<h1>DOM API</h1><p>선수 조건: 없음</p>'
}

// ------------------------------------------------------------------------------------------------------

const lis = document.getElementsByTagName('li');

[ ... lis ].forEach(li => {
    li.style.color = 'blue';
});

const fruits = document.getElementsByClassName('fruit');

console.log(fruits);

[ ... fruits ].forEach(fruit => {
    fruit.style.backgroundColor = 'lightskyblue';
});

/** HTML Collection 객체로 반환되는 경우 */

// ------------------------------------------------------------------------------------------------------

const autoLis = document.getElementById('listAutoOrder').querySelectorAll('li');

autoLis.forEach((li, index) => {
    li.classList.add(`list-item-${ index + 1 }`);
    li.textContent = `아이템 ${ index + 1 }`;
});

/** DOM 요소 배열로 반환되는 경우 */

// ------------------------------------------------------------------------------------------------------

const boxEl = document.getElementById('myBox');

boxEl.addEventListener('click', function() {
    boxEl.classList.toggle('active');
});

// ------------------------------------------------------------------------------------------------------

const btnDiv = document.getElementById('btnDiv');
const btnClear = document.getElementById('btnClear');
const resultDiv = document.getElementById('resultDiv');

btnDiv.addEventListener('click', (e) => { // 이벤트 객체가 매개변수 e로 전달되었다.
    resultDiv.innerHTML = 'Clicked';
});

btnDiv.addEventListener('mousedown', (e) => {
    resultDiv.innerHTML = 'Mouse Down';
});

btnDiv.addEventListener('mouseup', (e) => {
    resultDiv.innerHTML = 'Mouse Up';
});

btnClear.addEventListener('click', (e) => {
    resultDiv.innerHTML = '';
});

/**
 * 하나의 이벤트에는 하나의 이벤트 핸들러만 바인딩할 수 있다.
 */

// ------------------------------------------------------------------------------------------------------

let howMuch = 0;

const labelClicked = document.querySelector('.labelClicked');
const btnCount = document.getElementById('btnCount');
const btnStop = document.getElementById('btnStop');

labelClicked.textContent = howMuch;

function addClicks() {
    howMuch += 1;
    labelClicked.textContent = howMuch;
}

btnCount.addEventListener('click', addClicks);
btnStop.addEventListener('click', () => btnCount.removeEventListener('click', addClicks));

/**
 * 이벤트 핸들러 추가와 제거
 * onclick = attribute / property 형식으로 추가된 이벤트 리스너는 위 방식으로 제거되지 않는다.
 * removeAttribute / onclick = null 과 같은 방식으로 제거해야 한다.
 */

// ------------------------------------------------------------------------------------------------------

const checkPointArea = document.getElementById('checkPoint');

function getCoords(e) {
    checkPointArea.textContent = `clientX: ${ e.clientX }px / clientY: ${ e.clientY }px`;
}

document.addEventListener('mousemove', getCoords);

/**
 * 이벤트 객체를 매개변수로 전달받아 핸들러에서 사용할 수 있다.
 */

// ------------------------------------------------------------------------------------------------------

const listAnimals = document.getElementById('listAnimals');

function activeAnimal({target}) {
    if (!target.matches('#listAnimals > li')) return;

    [ ... listAnimals.children ].forEach(animal => {
        animal.classList.toggle('active', animal === target);
    });
}

// document.getElementById('lion').addEventListener('click', activeAnimal);
// document.getElementById('hippo').addEventListener('click', activeAnimal);
// document.getElementById('giraffe').addEventListener('click', activeAnimal);
// document.getElementById('tiger').addEventListener('click', activeAnimal);
/** 위와 같이 개별적으로 이벤트 핸들러를 지정할 수도 있지만... */

listAnimals.addEventListener('click', activeAnimal); // 상위 DOM 요소인 listAnimal에 직접 이벤트를 위임했다.

/**
 * 이벤트 캡쳐링 / 버블링을 이용하여 상위 DOM 요소에 이벤트 위임
 */

// ------------------------------------------------------------------------------------------------------

/** 박스 드래그 & 드롭 */

const movingBox = document.getElementById('movingBox');
const moveInitialMousePos = { x: 0, y: 0 };
const moveOffset = { x: 0, y: 0 };

const moveBox = e => {
    moveOffset.x = e.clientX - moveInitialMousePos.x;
    moveOffset.y = e.clientY - moveInitialMousePos.y;

    movingBox.style.transform = `translate3D(${moveOffset.x}px, ${moveOffset.y}px, 0)`;
}

movingBox.addEventListener('mousedown', e => {
    moveInitialMousePos.x = e.clientX - moveOffset.x;
    moveInitialMousePos.y = e.clientY - moveOffset.y;

    document.addEventListener('mousemove', moveBox);
});

document.addEventListener('mouseup', () => document.removeEventListener('mousemove', moveBox));

// ------------------------------------------------------------------------------------------------------

/** 클릭하면 박스가 이동 */

const teleportBox = document.getElementById('teleportBox');

document.addEventListener('click', e => {
    teleportBox.style.transform = `translate3D(${e.clientX}px, ${e.clientY}px, 0)`;
});