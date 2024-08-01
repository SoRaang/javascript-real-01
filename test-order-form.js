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