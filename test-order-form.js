/** 주문 form 만들기 */

const chkSame = document.getElementById('chkSameAsShip');
const txtBillName = document.getElementById('txtBillingName');
const txtBillPhone = document.getElementById('txtBillingPhone');
const txtBillAddr = document.getElementById('txtBillingAddr');

const txtShipName = document.getElementById('txtShippingName');
const txtShipPhone = document.getElementById('txtShippingPhone');
const txtShipAddr = document.getElementById('txtShippingAddr');

chkSame.addEventListener('change', (e) => {
    if (e.currentTarget.checked) {
        txtShipName.value = txtBillName.value;
        txtShipPhone.value = txtBillPhone.value;
        txtShipAddr.value = txtBillAddr.value;
    } else {
        txtShipName.value = '';
        txtShipPhone.value = '';
        txtShipAddr.value = '';
    }
});

// ------------------------------------------------------------------------------------------------------

const frmUserInfo = document.getElementById('frmUserInfo');
const usrID = document.getElementById('usrID');
const usrMail = document.getElementById('usrMail');
const usrPW = document.getElementById('usrPW');
const usrPWfirm = document.getElementById('usrPWfirm');
const rdoMailing = document.getElementsByName('user-mailing');
const btnConfirm = document.getElementById('btnConfirm');
const btnCancel = document.getElementById('btnCancel');

const [idChecker, pwChecker, pwChecker2] = frmUserInfo.querySelectorAll('span');

function checkID(e) {
    if (e.currentTarget.value.length < 4 || e.currentTarget.value.length > 15) {
        idChecker.textContent = '4~15자리의 영문 및 숫자로 이루어져야 합니다.';
    } else {
        idChecker.textContent = '';
    }
}

function checkPW(e) {
    if (e.currentTarget.value.length < 8 || e.currentTarget.value.length > 16) {
        pwChecker.textContent = '8~16자리의 영문 대소문자 및 숫자, 특수문자의 조합으로 이루어져야 합니다.';
    } else {
        pwChecker.textContent = '';
    }
}

function comparePW(e) {
    if (e.currentTarget.value !== usrPW.value) {
        pwChecker2.textContent = '비밀번호가 일치하지 않습니다.';
    } else {
        pwChecker2.textContent = '';
    }
}

usrID.addEventListener('blur', checkID);
usrPW.addEventListener('blur', checkPW);
usrPWfirm.addEventListener('blur', comparePW);