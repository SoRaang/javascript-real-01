/** Form */

const frmInfo = document.forms[0]; // forms 프로퍼티로 form을 선언했다.
const btnInfo = document.getElementById('btnInfo');
const userInfo = document.getElementById('userInfo');

function getInput() {
    let text = ''
    for(let i = 0; i < frmInfo.length; i ++) { // form 내부의 요소들을 배열의 길이로 호출한다.
        text += frmInfo.elements[i].value + '<br />'; // form 내부의 요소들을 배열내 요소처럼 호출한다.
    }
    userInfo.innerHTML = text;
}

// ------------------------------------------------------------------------------------------------------

const inputID = document.getElementById('inputID');
const inputPW = document.getElementById('inputPW');

function checkValue() {
    if (inputPW.value.length < 1) {
        userInfo.innerHTML = '비밀번호를 입력해 주세요.';
    } else if (inputPW.value.length > 10) {
        userInfo.innerHTML = '비밀번호 최대 길이를 초과했습니다.';
    } else {
        userInfo.innerHTML = '입력 완료';
    }

    ['inputID', 'inputPW'].forEach(field => document.getElementById(field).value = '');
}

btnInfo.addEventListener('click', checkValue);

setTimeout(() => {
    userInfo.innerHTMl = '';
}, 1500);

/**
 * forms 프로퍼티를 통해 문서 내 모든 form 요소가 저장된 HTML Collection 객체를 반환한다.
 * 배열처럼 인덱스 값을 통해 접근할 수 있다.
 */

// ------------------------------------------------------------------------------------------------------